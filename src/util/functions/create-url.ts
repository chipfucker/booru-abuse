export function createURL({ base, path = [], params = {} }: URLObject): string {
    let url = new URL(path.join("/"), base).toString();
    
    if (Object.keys(params).length) {
        type Parameters = NonNullable<URLObject["params"]>;
        type ParameterEntries = [keyof Parameters, Parameters[keyof Parameters]];

        const object: Parameters = {};
        Object.entries(params)
            .filter(([_, value]: ParameterEntries) => value != null)
            .forEach(([key, value]: ParameterEntries) => object[key] = value);

        url += "?" + new URLSearchParams(object).toString();
    }

    return url;
}

interface URLObject {
    base: string;
    path?: [],
    params?: { [key: string]: any }
}
