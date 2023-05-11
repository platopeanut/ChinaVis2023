export function preFix(num: number) {
    return num < 10 ? `0${num}` : `${num}`;
}

export async function loadJson<T>(url: string): Promise<T> {
    return fetch(url).then(res => res.json()) as T;
}