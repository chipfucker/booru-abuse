import { Comment } from "./comment.ts";
import type { RawComments } from "../../api/raw/interface/raw-comments.ts";

/**
 * An array of comments.
 */
export class Comments extends Array<Comment> {
    postId?: number;

    constructor (object: {
        postId?: number;
        array: Comment[];
    }) {
        super(...object.array);
        if (object.postId) this.postId = object.postId;
    }

    static fromRaw(raw: RawComments, postId?: number) {
        const array = raw.children.map((v, i) => Comment.fromRaw(v, i));
        return new this(postId
            ? { postId, array }
            : { array }
        );
    }
}
