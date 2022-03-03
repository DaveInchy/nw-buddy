const Utils: any = {};

class loopClass {

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

Utils.loop = loopClass;

export default Utils;