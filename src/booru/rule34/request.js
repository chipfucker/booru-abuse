import * as getUrl from "./url.js";

export async function autocomplete(query) {
    const url = getUrl.autocomplete(query);
    const data = await fetch("https://ac.rule34.xxx/autocomplete.php?q=zoologist_(terraria)", {
        headers: {
            "Referer": "https://rule34.xxx/",
            "Priority": "u=0"
        }
    }).then(response => response.json());

    return data;
}