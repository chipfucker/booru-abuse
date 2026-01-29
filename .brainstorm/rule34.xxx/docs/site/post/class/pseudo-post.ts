import {
    Post,
    PostComment,
    PostTags
} from "../../.."

/** A class with methods that return particular parts of post data. */
export declare class PseudoPost {
    /** The unique Id of the post. */
    id: number
    /**
     * Whether the Id is valid and associated with an accessible post.  
     * This value is `undefined` until a method of this instance is called.
     */
    valid?: boolean

    /** Returns the commments under the post. */
    getComments(): Promise<PostComment[]>
    /** Returns the tags associated with the post. */
    getTags(): Promise<PostTags>

    /** Returns a URL to this post on rule34.xxx. */
    getURL(): string
    /** Returns the full original post. */
    fetch(): Promise<Post|null>
}
