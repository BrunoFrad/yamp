export function getDuration(seconds: number) {
    let response = (seconds/60) > 10 ? (Math.floor(seconds/60)).toString() : "0"+(Math.floor(seconds/60)).toString();
    response += ":";
    response += (Math.floor(seconds%60)) > 10  ? (Math.floor(seconds%60)).toString() : "0"+(Math.floor(seconds%60)).toString();

    return response;
}