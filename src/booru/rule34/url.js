import { getUrl } from "#lib/url.js";

export function autocomplete(query) {
    const tag = query.match(/\s?(\S+)\s?$/)[1];
    return "https://ac.rule34.xxx/autocomplete.php?q=" + tag;
}

export function search(param) {
    return getUrl("https://rule34.xxx", {
        page: "post",
        s: "list",
        tags: param.query ?? "",
        pid: param.page * 42
    });
}