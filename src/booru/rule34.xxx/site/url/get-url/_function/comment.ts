import type { Comment } from "../../../_class/comment.ts";

export let getURL = (post: Comment["postId"], id: Comment["id"], query?: string): string => {
    let url = `https://rule34.xxx/index.php?page=post&s=view&id=${id}`;
    if (query) url += "&" + encodeURIComponent(query);
    url += "#c" + id;
    return url;
};
