import { PostComment       } from "../class/post-comment"
import { PostRating        } from "../enum/post-rating"
import { PostStatus        } from "../enum/post-status"
import { PostFile          } from "../file/class/post-file"
import { User              } from "../../class/user"
import { PostTags          } from "../../tag/class/post-tags"

/**
 * A post from Rule34.
 */
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
         * Useful in place of checking whether the username is "bot".
         */
        bot: boolean
    }
    /**
     * The date this post was created.
     * @warning This value is likely to be inaccurate.
     */
    createdAt: Date
    /**
     * The date this post was last updated.
     * @warning This value is likely to be inaccurate.
     */
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

    /** Returns a URL to this post on rule34.xxx. */
    getURL(): string
}
