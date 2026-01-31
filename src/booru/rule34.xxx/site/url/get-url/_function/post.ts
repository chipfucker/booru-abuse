import type { Post } from "../../../post/_class/post.ts";

export let getURL = (id: Post["id"], query?: string): string => {
    let url = `https://rule34.xxx/index.php?page=post&s=view&id=${id}`;
    if (query) url += "&" + encodeURIComponent(query);
    return url;
};
