import type { Authentication } from "../../client/interfaces/authentication.ts";
import { createURL } from "../../../../../util/misc/functions/create-url.ts";
import * as apiParameters from "../types/api-parameters.ts";

let getURL = (
    s: string,
    params: NonNullable<Parameters<typeof createURL>[0]["params"]>,
    auth: Authentication
) => createURL({
    base: "https://api.rule34.xxx/",
    params: {
        page: "dapi",
        q: "index",
        s: s,
        ...params,
        ...auth
    }
});

export function autocomplete(
    params: apiParameters.Autocomplete
): string {
    return createURL({
        base: "https://api.rule34.xxx/",
        path: "autocomplete.php",
        params: params
    });
}

export function post(
    auth: Authentication,
    params: apiParameters.Search
): string {
    return getURL("post", params, auth);
}

export function postBothFormats(
    auth: Authentication,
    params: Omit<apiParameters.Search, "json">
): string {
    const xml: apiParameters.Search = params;
    xml.json = 0;
    delete xml.fields;

    const json: apiParameters.Search = params;
    json.json = 1;

    return {
        xml: post(xml, auth),
        json: post(json, auth)
    };
}
