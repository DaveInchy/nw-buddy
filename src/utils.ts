var utils: any;

export class loop {

    constructor(callback: () => Promise<void>) {
        this.loop(callback);
    }

    public async wait(intervalInMilliseconds: any) {
        return new Promise(resolve => {
            setTimeout(resolve, intervalInMilliseconds);
        });
    }

    // a function that infinitely loops and calls the callback function
    public async loop(callback: any) {
        while (true) {
            await this.wait(1000);
            await callback();
        }
    }

}

utils.loop = loop;

export default utils;