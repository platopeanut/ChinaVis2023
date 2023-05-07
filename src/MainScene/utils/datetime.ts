import {preFix} from "./util.ts";

export function formatDate(date: Date, includeMillisecond = false) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    let text = year + "-" + preFix(month) + "-" + preFix(day)
        + " " + preFix(hour) + ":" + preFix(minute) + ":" + preFix(second);
    if (!includeMillisecond) return text;
    const millisecond = date.getMilliseconds();
    text += ".";
    text += millisecond < 100 ? (millisecond < 10 ? "00" + millisecond : "0" + millisecond) : millisecond;
    return text;
}
