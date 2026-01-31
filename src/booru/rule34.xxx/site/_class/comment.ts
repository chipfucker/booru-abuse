import { User } from "./user.ts";
import { getURL } from "../url/get-url/_function/comment.ts";
import type { Id } from "../../../../util/_type/id.ts";
import type { RawComment } from "../../raw/_interface/raw-comment.ts";

export class Comment {
    /** The Id of the post this comment is under. */
    postId: Id;
    /** The comment's unique Id. */
    id: Id;
    /** The author of the comment. */
    author: User;
    /** The comment's content. */
    content: string;
    /**
     * The date this post was created.
     * @deprecated
     * This value is almost guaranteed to be inaccurate.  
     * This always, presumably by mistake, returns the date (specific to the timezone
     * of Rule34's servers) that the comment was fetched.
     */
    created: Date;

    constructor (options: ConstructorOptions) {
        this.postId = parseInt(options.post_id as string);
        this.id = parseInt(options.id as string);
        this.author = new User({
            name: options.creator,
            id: parseInt(options.creator_id as string)
        });
        this.content = options.body;
        this.created = new Date(options.created_at);
    }
    
    /**
     * Returns an anchor URL to this comment on rule34.xxx.
     * @param query The search to apply to the URL.
     */
    toURL = (query?: string) => getURL(this.postId, this.id, query);
}

type ConstructorOptions = RawComment;
