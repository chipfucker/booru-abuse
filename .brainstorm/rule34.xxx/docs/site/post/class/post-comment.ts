import {
    User,
    Id
} from "root"

/** A comment under a post. */
export declare class PostComment {
    /** The author of the comment. */
    author: User
    /** The comment's content. */
    content: string
    /** The comment's unique Id. */
    id: Id
    /** The Id of the post this comment is under. */
    postId: Id
    /**
     * The date this post was created.
     * @deprecated
     * This value is almost guaranteed to be inaccurate.  
     * This always, presumably by mistake, returns the date (specific to the timezone
     * of Rule34's servers) that the comment was fetched.
     */
    createdAt: Date

    /** Returns an anchor URL to this comment on rule34.xxx. */
    getURL(): string
}
