//@depricated legacy
export const logMessage = async (type, message) => {
    var http = await fetch('http://localhost:8433/'
        + '?time=' + encodeURIComponent(`${Date.now()}`)
        + '&subject=' + encodeURIComponent(`${type}`)
        + '&message=' + encodeURIComponent(`${message}`)
        + '&type=' + encodeURIComponent(`${type}`), {
            method: 'GET',
        });
    return http;
};

//@deprecated legacy
export const logError = async function (error) {
    return await logMessage('error', error);
}

class DebugClient {

    public static host: string = 'http://localhost:8433/';

    public constructor()
    {
        return this;
    }

    public static logMessage = async (subject: string = "default", message: string = "debugging message default", type: 'error' | 'message' = 'message'): Promise<any> =>
    {
        var http: Response = await fetch(`${DebugClient.host}`
            + '?time=' + encodeURIComponent(`${Date.now()}`)
            + '&subject=' + encodeURIComponent(`${subject.toString()}`)
            + '&message=' + encodeURIComponent(`${message}`)
            + '&type=' + encodeURIComponent(`${type}`));
        return;
    }

    public static logError = async (message: string = "error while debugging"): Promise<any> =>
    {
        var err = await DebugClient.logMessage('error', message.toString(), 'error');
        return;
    }

}

export default DebugClient;