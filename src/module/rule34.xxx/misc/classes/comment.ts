import { User } from "./user.ts";
import { comment as getURL } from "../../util/functions/site-url.ts";
import type { RawComment } from "../interfaces/raw-comment.ts";

/** A comment under a post. */
export class Comment {
    // TODO: better property name for 'postId'?
    /** The Id of the post over this comment. */
    postId: number;
    /** The comment's unique Id. */
    id: number;
    /** The creator of the comment. */
    author: User;
    /** The comment's body. */
    content: string;
    /**
     * The date this comment was created.
     * @deprecated
     * This value is guaranteed to be inaccurate.  
     * This always, presumably by mistake, returns the date (specific to the timezone
     * of Rule34's servers) that the comment was fetched.
     */
    created: Date;

    static fromRaw(raw: RawComment): Comment {
        const comment = {
            postId: parseInt(raw.post_id),
            id: parseInt(raw.id),
            author: User.fromObject({
                name: raw.creator,
                id: parseInt(raw.creator_id)
            }),
            content: raw.body,
            created: new Date(raw.created_at)
        };

        return new Comment(comment);
    }

    constructor (options: {
        postId: number;
        id: number;
        author: User;
        content: string;
        created: Date;
    }) {
        this.postId = options.postId;
        this.id = options.id;
        this.author = options.author;
        this.content = options.content;
        this.created = options.created;
    }

    /**
     * Returns an anchor URL to this comment on rule34.xxx.
     * @param query The search to apply to the URL.
     */
    toURL = (query?: string) => getURL(this.postId, this.id, query);
}