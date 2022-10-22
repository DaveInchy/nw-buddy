import { Config } from "./global";

export const logMessage = async (type, message) => {
    var http = await fetch((Config.debug.ssl ? "https://" : "http://") + Config.debug.host + ':' + Config.debug.port + '/'
        + '?time=' + encodeURIComponent(`${Date.now()}`)
        + '&subject=' + encodeURIComponent(`${type}`)
        + '&message=' + encodeURIComponent(`${message}`)
        + '&type=' + encodeURIComponent(`${type}`), {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Header": "*"
            }
        });
    return http;
};
export const logError = async function (error) {
    return await logMessage('error', error);
}
export default { logMessage, logError };