export function createURL({ base, path = [], param: query = {} }: URLObject): string {
    let url = new URL(path.join("/"), base).toString();
    if (Object.keys(query).length) {
        const object: Record<string, any> = {};
        Object.entries(query)
            .filter(([key, value]: [string, any]) => value != null)
            .forEach(([key, value]: [string, any]) => object[key] = value);
        const params = new URLSearchParams(object).toString();
        url += "?" + params;
    }
    return url;
}

interface URLObject {
    base: string;
    path?: string[];
    param?: Record<string, any>;
}
