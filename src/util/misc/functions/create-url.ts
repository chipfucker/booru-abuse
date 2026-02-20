export function createURL({ base, path = [], params = {} }: URLObject): string {
    let url = new URL(path.join("/"), base).toString();
    
    if (Object.keys(params).length) {
        const object: NonNullable<URLObject["params"]> = {};
        Object.entries(params)
            .filter(([_, value]) => value != null)
            .forEach(([key, value]) => object[key] = value);

        url += "?" + new URLSearchParams(object).toString();
    }

    return url;
}

interface URLObject {
    base: string;
    path?: string[],
    params?: { [key: string]: any }
}
