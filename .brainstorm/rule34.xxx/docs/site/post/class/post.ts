import {
    PostComment,
    PostRating,
    PostStatus,
    PostFile,
    User,
    SearchQuery,
    PostTags
} from "../../../export"

/** A post from Rule34. */
export declare class Post {
    /** The media files of the post. */
    file: PostFile
    /** The unique Id of the post. */
    id: number
    /** The parent post's Id. */
    parent?: number
    /** The Ids of this post's children. */
    children: number[]
    /** The total upvotes of this post. */
    score: number

    // TODO: better word for 'maturity?'
    /** The post's 'maturity' rating. */
    rating: PostRating
    // TODO: better word for 'display status?'
    /** The post's display status. */
    status: PostStatus

    /** The creator of the post. */
    author: User & { // TODO: better property name?
        /**
         * Whether the post was uploaded by a bot.  
         * Useful in place of checking whether the username is "bot"; equivalent to:
         * 
         * ```javascript
         * this.name == "bot"
         * ```
         */
        bot: boolean
    }
    /** The date this post was created. */
    createdAt: Date
    /** The date this post was last updated. */
    updatedAt: Date

    /**
     * The source attributed to this post.  
     * Typically a URL.
     */
    source: string

    /** Returns the commments under the post. */
    getComments(): Promise<PostComment[]>
    /** Returns the tags associated with the post. */
    tags: PostTags

    /**
     * Returns a URL to this post on rule34.xxx.
     * @param search The search associated with the URL.
     */
    getURL(search?: SearchQuery): string
}
