import { createURL } from "../../../../util/functions/create-url.ts";
import type { Authentication } from "../../client/interfaces/authentication.ts";

const base = "https://api.rule34.xxx/";

let getURL = (params: NonNullable<Parameters<typeof createURL>[0]["params"]>, auth: Authentication) => createURL({
    base: base,
    params: {
        page: "dapi",
        q: "index",
        ...params,
        ...auth
    }
});

export let autocomplete = (query: string) => createURL({
    base: base,
    path: [ "autocomplete.php" ],
    params: { q: query }
});

export let post = (options: {
    id: number;
}, auth: Authentication) => ({
    json: getURL({
        s: "post",
        json: 1,
        fields: "tag_info",
        ...options
    }, auth),
    xml: getURL({
        s: "post",
        json: 0,
        ...options
    }, auth)
});

export let search = ( options: {
    tags: string;
    limit: number;
    pid: number;
}, auth: Authentication ) => ({
    json: getURL({
        s: "post",
        json: 1,
        fields: "tag_info",
        ...options
    }, auth),
    xml: getURL({
        s: "post",
        json: 0,
        ...options
    }, auth)
});

export let comments = (options: {
    post_id?: number;
}, auth: Authentication) => getURL({
    s: "comment",
    ...options
}, auth);

export let tags = (options: {
    id?: number;
    limit: number;
}, auth: Authentication) => getURL({
    s: "tag",
    ...options
}, auth);
