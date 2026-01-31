import { getCredential } from "../../../client/_function/credentials.ts";
import { createURL } from "../../../../../util/_function/create-url.ts";

const base = "https://api.rule34.xxx/";
const creds = () => ({
    api_key: getCredential("api_key"),
    user_id: getCredential("user_id")
});

let getURL = (params: Parameters<typeof createURL>[0]["param"]) => createURL({
    base: "https://api.rule34.xxx/",
    param: {
        page: "dapi",
        q: "index",
        ...params,
        ...creds()
    }
});

export let autocomplete = (query: string) => createURL({
    base: base,
    path: [ "autocomplete.php" ],
    param: { q: query }
});

export let post = (id: number) => ({
    json: getURL({
        s: "post",
        json: 1,
        fields: "tag_info",
        id: id
    }),
    xml: getURL({
        s: "post",
        json: 0,
        id: id
    })
});
export let search = ({ query, limit, page }: SearchOptions) => ({
    json: getURL({
        s: "post",
        json: 1,
        fields: "tag_info",
        tags: query,
        limit: limit,
        pid: page
    }),
    xml: getURL({
        s: "post",
        json: 0,
        tags: query,
        limit: limit,
        pid: page
    })
});

export let comments = (post?: number) => getURL({
    s: "comment",
    post_id: post
});

export let tags = ({ id, limit }: { id?: number, limit: number }) => getURL({
    s: "tag",
    id: id,
    limit: limit
});

interface SearchOptions {
    query: string;
    limit: number;
    page: number;
}