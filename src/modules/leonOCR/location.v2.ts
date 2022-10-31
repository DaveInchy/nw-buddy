import { takeScreenshot } from './lib/media';
import defaultProfile from './default_profile.json';

/* You have to have brigtness on 5 ingame
 *
 */

const WIDTH = 288;
const HEIGHT = 14;

async function preprocessorImage(url: string): Promise<number[][]> {
    return new Promise((resolve, reject) => {
        const image = new Image(WIDTH, HEIGHT);
        image.src = url;
        image.onload = async () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const context = canvas.getContext('2d')!;
            context.drawImage(image, 0, 0);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

            const grayscaleArray: number[] = [];
            for (let i = 0; i < imageData.data.length; i += 4) {
                const grayscale =
                    imageData.data[i] * 0.29899999499320984 +
                    imageData.data[i + 1] * 0.5870000123977661 +
                    (57.0 / 500.0) * imageData.data[i + 2];
                grayscaleArray.push(grayscale);
            }

            const array2d: number[][] = [];
            for (let i = 0; i < HEIGHT; i++) {
                array2d[HEIGHT - 1 - i] = [];
                for (let j = 0; j < WIDTH; j++) {
                    array2d[HEIGHT - 1 - i][j] = grayscaleArray[i * WIDTH + j];
                }
            }

            resolve(array2d);
        };
        image.onerror = async (error) => {
            reject(error);
        };
    });
}

export async function getScreenshotFromNewWorld() {
    const gameInfo = await new Promise<overwolf.games.GetRunningGameInfoResult>(
        (resolve) => overwolf.games.getRunningGameInfo((result) => resolve(result))
    );
    if (!gameInfo || gameInfo.classId !== 21816) {
        throw new Error('Game is not running');
    }
    const url = await takeScreenshot({
        crop: {
            x: gameInfo.logicalWidth - 293,
            y: 20,
            width: WIDTH,
            height: HEIGHT,
        },
    });
    return url;
}

function getBlockArray(xOffset: number, screenGrayArray: number[][]) {
    const block: number[][] = [];
    for (let h = 0; h < 14; h++) {
        block[h] = [];
        for (let w = 0; w < 9; w++) {
            block[h][w] = screenGrayArray[h][w + xOffset];
        }
    }
    return block;
}

function characterScoreMatched(
    type: string,
    characterPixelStats: {
        x: number;
        y: number;
        count: number;
        min: number;
        max: number;
        avg: number;
        gap: number;
    }[],
    block: number[][]
) {
    let scoreSum = 0;
    for (const stat of characterPixelStats) {
        const pixel = block[stat.y][stat.x];
        if (pixel >= stat.min - 7 && pixel <= stat.max + 7) {
            scoreSum++;
        }
    }

    const finalScore =
        scoreSum == 0 ? 0 : (scoreSum / characterPixelStats.length) * 100;
    return { type, finalScore };
}

// For debug usage
// function print(array: number[][]) {
//   let stringBuilder = '';
//   const rowCount = array.length;
//   const colCount = array[0].length;
//   for (let row = rowCount - 1; row >= 0; row--) {
//     for (let col = 0; col < colCount; col++) {
//       stringBuilder += `${
//         array[row][col] > 75 ? Math.floor(array[row][col]) : 'X'
//       }\t`;
//     }
//     stringBuilder += '\n';
//   }
//   console.log(stringBuilder);
//   console.log('\n');
// }

export async function getLocation(url: string): Promise<string> {
    const screenGrayArray = await preprocessorImage(url);
    let resultString = '';
    for (let index = 0; index < 32; index++) {
        const x = index * 9;
        const characterPixels = getBlockArray(x, screenGrayArray);

        const results = defaultProfile.characterModels.map((model) =>
            characterScoreMatched(model.type, model.stats, characterPixels)
        );
        const sortedResults = results.sort((a, b) => b.finalScore - a.finalScore);

        const result = sortedResults[0];
        if (result.finalScore <= 75) {
            resultString += ' ';
        } else {
            resultString += result.type;
        }
    }
    return resultString;
}

const regExp = new RegExp(/\[\d{3,}\.\d{3}, \d{3,}\.\d{3}, \d{3,}\.\d{3}\]/);

export function toLocation(locationString: string): [number, number, number] | null {
    try {
        const match = locationString.match(regExp);
        if (!match) {
            return null;
        }
        const result = JSON.parse(match[0]) as [number, number, number];
        if (
            !result ||
            typeof result[1] !== 'number' ||
            typeof result[0] !== 'number'
        ) {
            return null;
        }
        return [result[1], result[0], 0];
    } catch (error) {
        return null;
    }
}

export default function owOCR(): Promise<[number, number, number]> {
    return (async () => {
        return toLocation(
            await getLocation(
                await getScreenshotFromNewWorld().then(result => result)
            ).then(result => result)
        )
    })()
}