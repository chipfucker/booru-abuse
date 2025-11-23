import { JSDOM } from "jsdom";
import { getUrl } from "#lib/url.js";

export async function autocomplete(query) {
    const tag = getAutocompleteTag(query);
    if (!tag) return null;

    const data = await fetch("https://ac.rule34.xxx/autocomplete.php?q=" + tag, {
        headers: {
            "Referer": "https://rule34.xxx/",
            "Priority": "u=0"
        }
    }).then(getJson);

    return data;
}

export const FE = {
    async search(param) {
        return await fetch(getUrl("https://rule34.xxx", {
            page: "post",
            s: "list",
            tags: param.query ?? "",
            pid: param.offset
        })).then(getDocument);
    }
};

//#region functions

function getAutocompleteTag(query) {
    return query.match(/[^ -?]+$/)?.at(0) || null;
}

function getDocument(response) {
    return response.text().then(text => (new JSDOM(text)).window.document);
}
function getJson(response) {
    return response.json();
}

//#endregion
