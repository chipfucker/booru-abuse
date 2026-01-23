import { PostComment       } from "../interface/post-comment"
import { PostRating        } from "../enum/post-rating"
import { PostStatus        } from "../enum/post-status"
import { PostFile          } from "../file/interface/post-file"
import { PostFileExtension } from "../file/type/post-file-extension"
import { PostFileType      } from "../file/enum/post-file-type"
import { User              } from "../../class/user"
import { PostTags          } from "../../tag/class/post-tags"

/**
 * A post from Rule34.
 */
export declare class Post {
    /**
     * The media files of the post.
     * 
     * The URL of each image is structured like so:
     * 
     * ```plain text
     * https://api-cdn.rule34.xxx/images/1234/1234567890abcdef.jpg
     *         ├─────┘            ├────┘ ├──┘ ├──────────────┘ ├─┘
     *         Server reg.        Var.   Dir  Hash             Extension
     * ```
     */
    file: PostFile & {
        /** The file's type. */
        type: PostFileType
        /** The file's extension. */
        extension: PostFileExtension
        /**
         * A static, downsampled version of the main file, if one exists.  
         * If one doesn't exist, this mirrors the main file.  
         * A downsampled image will, however, always exist for animated files.
         * 
         * This file is always a static image. If the main file is animated, the downsample is usually the thumbnail or first frame of the main file.
         */
        downsample: PostFile & {
            /**
             * Whether the downsample should be used instead of the original for bandwidth purposes.  
             * This is judged by whether Rule34 displays the downsample by default when a post is viewed.
             * 
             * It's suggested to check both `file.type` and `downsample.default` before using this by default, as this file is always a static image&mdash;it is never animated, regardless of the original file.
             */
            default: boolean
        }
        /** A much more downsampled and static version of the main file, purposed for a thumbnail. */
        thumbnail: PostFile
        /** The directory of the post's files. */
        directory: number
        /** The hash name of the post's files. */
        hash: string
    }

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
