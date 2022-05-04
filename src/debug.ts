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
export const logError = async function (error) {
    return await logMessage('error', error);
}
export default { logMessage, logError };