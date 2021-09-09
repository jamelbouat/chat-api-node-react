
let timeout: number;

export const throttle = (func: () => void, time: number): void => {
    clearTimeout(timeout);
    if (func !== undefined && time !== undefined) {
        timeout = setTimeout(func, time);
    }
};
