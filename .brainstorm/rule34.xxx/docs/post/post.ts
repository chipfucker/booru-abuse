namespace Rule34 {
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

    /**
     * A class with methods that return particular parts of post data.
     */
    export declare class PseudoPost {
        /** The unique Id of the post. */
        id: number
        /**
         * Whether the Id is valid and associated with an accessible post.  
         * This value is `undefined` until a method of this instance is called.
         */
        valid?: boolean

        /** Returns the commments under the post. */
        // getComments(): Promise<PostComment[]>
        /** Returns the tags associated with the post. */
        getTags(): Promise<PostTags>

        /** Returns a URL to this post on rule34.xxx. */
        getURL(): string
        /** Returns the full original post. */
        fetch(): Promise<Post|null>
    }

    /**
     * A post media file.
     */
    export declare interface PostFile {
        /** The media's CDN URL. */
        url: string & {
            /**
             * Modify the URL to use a different CDN subdomain.
             * @param region The region to use.
             */
            changeServerRegion(region: CDNServer): void
            /**
             * Return the URL with a different CDN subdomain.
             * @param region The region to use.
             */
            withServerRegion(region: CDNServer): string
        }
        /** The dimensions of the media file. */
        size: [ width: number, height: number ]
    }

    /**
     * A comment under a post.
     */
    export declare interface PostComment {
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
         * This always, presumably by mistake, returns the date (specific to the timezone of Rule34's servers) that the comment was fetched.
         */
        createdAt: Date

        /** Returns an anchor URL to this comment on rule34.xxx. */
        getURL(): string
    }

    // TODO
    /** Possible file extensions for a post's media. */
    export declare type PostFileExtension =
        | "png"
        | "jpg"

    // TODO: missing properties
    /**
     * Rule34's regional CDN servers for media files.  
     * Used when replacing the subdomain of file URLs.
     */
    export declare enum CDNServer { // TODO: better enum name?
        /** The image CDN dedicated to APIs. */
        API = "api-cdn",
        /** The video CDN dedicated to APIs. */
        APIMP4 = "api-cdn-mp4"
    }
    /** Alias for the {@link CDNServer `CDNServer` enum}. */
    export declare type PostFileServerRegion = CDNServer

    // TODO: better word for 'animation states?'
    /** The possible animation states of a post's media file. */
    export declare enum PostFileType {
        /** A still image&mdash;no animation or audio. */
        Static,
        /** An animated, looped image&mdash;no playback control or audio. */
        Animated,
        /** An animated video. */
        Video
    }

    // TODO: better word for 'maturity?'
    /** The possible 'maturity' ratings of a post. */
    export declare enum PostRating {
        /**
         * No explicit material.
         * @deprecated
         * This is no longer in use on Rule34, and the only posts you may find with this rating are very recent or already deleted.  
         * Consider using {@linkcode PostRating.Questionable Questionable} to get safer posts instead.
         */
        Safe,
        /** Safe or suggestive material. */
        Questionable,
        /** Explicit material. */
        Explicit
    }

    // TODO: better word for 'display status?'
    /** The possible display statuses of a post. */
    export declare enum PostStatus {
        /** Unmarked. */
        Active,
        /** Reported and yet to be reviewed. */
        Flagged,
        /** Not visible. */
        Deleted
    }
}