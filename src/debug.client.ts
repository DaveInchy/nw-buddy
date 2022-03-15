//@depricated legacy
export const logMessage = async (type, message) => {
    var http = await fetch('http://localhost:8420/'
        + '?time=' + encodeURIComponent(`${Date.now()}`)
        + '&subject=' + encodeURIComponent(`${type}`)
        + '&message=' + encodeURIComponent(`${message}`)
        + '&type=' + encodeURIComponent(`${type}`));
    return http;
};

//@depricated legacy
export const logError = async function (error) {
    return await logMessage('error', error);
}

class DebugClient {

    public static host: string = 'http://localhost:8420/';

    constructor()
    {
        return;
    }

    public send = async (subject: string = "default", message: string = "debugging message default", type: 'error' | 'message' = 'message'): Promise<any> =>
    {
        var http: Response = await fetch(`${DebugClient.host}`
            + '?time=' + encodeURIComponent(`${Date.now()}`)
            + '&subject=' + encodeURIComponent(`${subject.toString()}`)
            + '&message=' + encodeURIComponent(`${message}`)
            + '&type=' + encodeURIComponent(`${type}`));
        return http.json();
    }

    public sendError = async (message: string = "error while debugging"): Promise<any> =>
    {
        return await this.send('error', message.toString(), 'error');
    }

}

export default new DebugClient() as DebugClient;