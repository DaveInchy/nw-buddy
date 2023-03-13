export function takeScreenshot(
    params?: Partial<overwolf.media.MemoryScreenshotParams>
): Promise<string> {
    return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => reject(), 2000);
        overwolf.media.getScreenshotUrl(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            {
                roundAwayFromZero: true,
                ...(params || {}),
            },
            (result) => {
                clearTimeout(timeoutId);
                if (result.url) {
                    resolve(result.url);
                } else {
                    reject(result.error);
                }
            }
        );
    });
}