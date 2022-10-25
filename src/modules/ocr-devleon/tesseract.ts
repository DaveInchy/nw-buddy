import { createWorker } from 'tesseract.js';
import { takeScreenshot } from './media';

const worker = createWorker();

async function initWorker() {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    await worker.setParameters({
        tessedit_char_whitelist: '[].,0123456789 ',
        preserve_interword_spaces: '1',
    });
}

const initializedWorker = initWorker();

function rgbToHsl(r: number, g: number, b: number) {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    const cmin = Math.min(r, g, b);
    const cmax = Math.max(r, g, b);
    const delta = cmax - cmin;
    let h = 0;
    let s = 0;
    let l = 0;

    // Calculate hue
    // No difference
    if (delta == 0) h = 0;
    // Red is max
    else if (cmax == r) h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g) h = (b - r) / delta + 2;
    // Blue is max
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0) h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    return [h, s, l];
}

function thresholdFilter(pixels: Uint8ClampedArray) {
    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const hsl = rgbToHsl(r, g, b);
        let val;
        const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        if (
            Math.abs(hsl[0] - 65) < 30 &&
            hsl[1] < 60 &&
            Math.abs(hsl[2] - 65) < 20 &&
            gray > 127
        ) {
            val = 255;
        } else {
            val = 0;
        }
        pixels[i] = pixels[i + 1] = pixels[i + 2] = val;
    }
}

async function preprocessorImage(
    url: string,
    width: number,
    height: number
): Promise<string> {
    return new Promise((resolve, reject) => {
        const image = new Image(width, height);
        image.src = url;
        image.onload = async () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const context = canvas.getContext('2d')!;
            context.drawImage(image, 0, 0);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            blurARGB(imageData.data, canvas, 1);
            thresholdFilter(imageData.data);
            invertColors(imageData.data);
            context.putImageData(imageData, 0, 0);
            const dataURI = canvas.toDataURL('image/jpeg');
            resolve(dataURI);
        };
        image.onerror = async (error) => {
            reject(error);
        };
    });
}
// internal kernel stuff for the gaussian blur filter
let blurRadius = 0;
let blurKernelSize = 0;
let blurKernel: Int32Array = new Int32Array();
let blurMult: Array<any> = [];

function buildBlurKernel(r: number) {
    let radius = (r * 3.5) | 0;
    radius = radius < 1 ? 1 : radius < 248 ? radius : 248;

    if (blurRadius !== radius) {
        blurRadius = radius;
        blurKernelSize = (1 + blurRadius) << 1;
        blurKernel = new Int32Array(blurKernelSize);
        blurMult = new Array(blurKernelSize);
        for (let l = 0; l < blurKernelSize; l++) {
            blurMult[l] = new Int32Array(256);
        }

        let bki;
        let bm, bmi;

        for (let i = 1, radiusi = radius - 1; i < radius; i++) {
            blurKernel[radius + i] = blurKernel[radiusi] = bki = radiusi * radiusi;
            bm = blurMult[radius + i];
            bmi = blurMult[radiusi--];
            for (let j = 0; j < 256; j++) {
                bm[j] = bmi[j] = bki * j;
            }
        }
        const bk = (blurKernel[radius] = radius * radius);
        bm = blurMult[radius];

        for (let k = 0; k < 256; k++) {
            bm[k] = bk * k;
        }
    }
}

function blurARGB(
    pixels: Uint8ClampedArray,
    canvas: HTMLCanvasElement,
    radius: number
) {
    const width = canvas.width;
    const height = canvas.height;
    const numPackedPixels = width * height;
    const argb = new Int32Array(numPackedPixels);
    for (let j = 0; j < numPackedPixels; j++) {
        argb[j] = getARGB(pixels, j);
    }
    let sum, cr, cg, cb, ca;
    let read, ri, ym, ymi, bk0;
    const a2 = new Int32Array(numPackedPixels);
    const r2 = new Int32Array(numPackedPixels);
    const g2 = new Int32Array(numPackedPixels);
    const b2 = new Int32Array(numPackedPixels);
    let yi = 0;
    buildBlurKernel(radius);
    let x, y, i;
    let bm;
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            cb = cg = cr = ca = sum = 0;
            read = x - blurRadius;
            if (read < 0) {
                bk0 = -read;
                read = 0;
            } else {
                if (read >= width) {
                    break;
                }
                bk0 = 0;
            }
            for (i = bk0; i < blurKernelSize; i++) {
                if (read >= width) {
                    break;
                }
                const c = argb[read + yi];
                bm = blurMult[i];
                ca += bm[(c & -16777216) >>> 24];
                cr += bm[(c & 16711680) >> 16];
                cg += bm[(c & 65280) >> 8];
                cb += bm[c & 255];
                sum += blurKernel[i];
                read++;
            }
            ri = yi + x;
            a2[ri] = ca / sum;
            r2[ri] = cr / sum;
            g2[ri] = cg / sum;
            b2[ri] = cb / sum;
        }
        yi += width;
    }
    yi = 0;
    ym = -blurRadius;
    ymi = ym * width;
    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            cb = cg = cr = ca = sum = 0;
            if (ym < 0) {
                bk0 = ri = -ym;
                read = x;
            } else {
                if (ym >= height) {
                    break;
                }
                bk0 = 0;
                ri = ym;
                read = x + ymi;
            }
            for (i = bk0; i < blurKernelSize; i++) {
                if (ri >= height) {
                    break;
                }
                bm = blurMult[i];
                ca += bm[a2[read]];
                cr += bm[r2[read]];
                cg += bm[g2[read]];
                cb += bm[b2[read]];
                sum += blurKernel[i];
                ri++;
                read += width;
            }
            argb[x + yi] =
                ((ca / sum) << 24) |
                ((cr / sum) << 16) |
                ((cg / sum) << 8) |
                (cb / sum);
        }
        yi += width;
        ymi += width;
        ym++;
    }
    setPixels(pixels, argb);
}

function setPixels(pixels: Uint8ClampedArray, data: Int32Array) {
    let offset = 0;
    for (let i = 0, al = pixels.length; i < al; i++) {
        offset = i * 4;
        pixels[offset + 0] = (data[i] & 0x00ff0000) >>> 16;
        pixels[offset + 1] = (data[i] & 0x0000ff00) >>> 8;
        pixels[offset + 2] = data[i] & 0x000000ff;
        pixels[offset + 3] = (data[i] & 0xff000000) >>> 24;
    }
}

function getARGB(data: Uint8ClampedArray, i: number) {
    const offset = i * 4;
    return (
        ((data[offset + 3] << 24) & 0xff000000) |
        ((data[offset] << 16) & 0x00ff0000) |
        ((data[offset + 1] << 8) & 0x0000ff00) |
        (data[offset + 2] & 0x000000ff)
    );
}

function invertColors(pixels: Uint8ClampedArray) {
    for (let i = 0; i < pixels.length; i += 4) {
        pixels[i] = pixels[i] ^ 255; // Invert Red
        pixels[i + 1] = pixels[i + 1] ^ 255; // Invert Green
        pixels[i + 2] = pixels[i + 2] ^ 255; // Invert Blue
    }
}

export async function getScreenshotFromNewWorld() {
    const gameInfo = await new Promise<overwolf.games.GetRunningGameInfoResult>(
        (resolve) => overwolf.games.getRunningGameInfo((result) => resolve(result))
    );
    if (!gameInfo || gameInfo.classId !== 21816) {
        // throw new Error('Game is not running');
        return;
    }
    const url = await takeScreenshot({
        crop: {
            x: gameInfo.logicalWidth - 293,
            y: 20,
            width: 288,
            height: 14,
        },
        rescale: {
            width: 288 * 2,
            height: 14 * 2,
        },
    });
    return url;
}

export async function getLocation(url: string): Promise<[number, number, number]> {
    const dataURL = await preprocessorImage(url, 550, 30);
    await initializedWorker;

    const {
        data: { text },
    } = await worker.recognize(dataURL);

    const match = text.match(/\[(\d+[,.]\d{3}|\d+)[, ]+(\d+[,.]\d{3}|\d+)/);
    if (!match) {
        throw new Error('Can not match position');
    }

    const [x, y] = match
        .slice(1)
        .map((a) => a.replace(',', '.'))
        .map(Number);
    // if (x < 4531 || x > 14336 || y < 43 || y > 10280) {
    //     throw new Error('Out of bounds');
    // }
    return [y, x, 0];
}