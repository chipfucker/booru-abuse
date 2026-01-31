import type { Comment } from "../../../_class/comment.ts";

export let getURL = (post: Comment["postId"], id: Comment["id"], query?: string): string => {
    return "?";
};
