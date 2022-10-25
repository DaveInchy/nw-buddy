export function takeScreenshot(
    params?: Partial<overwolf.media.MemoryScreenshotParams>
): Promise<string> {
    return new Promise((resolve, reject) => {
        overwolf.media.getScreenshotUrl(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            {
                roundAwayFromZero: true,
                ...(params || {}),
            },
            (result) => {
                if (result.url) {
                    resolve(result.url);
                } else {
                    reject(result.error);
                }
            }
        );
    });
}