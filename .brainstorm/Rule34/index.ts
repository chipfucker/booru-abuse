//#region class

/**
 * A client to retrieve and parse Rule34 data.
 */
declare class Client {
    constructor({ auth, config }: {
        /** Authorization for API access. */
        auth: Authentication
        /** Client configuration object. */
        config?: {
        }
    })
    
    /**
     * Returns autocomplete suggestions for a given search.
     * @param query Search to get autocomplete suggestions for.
     */
    autocomplete(query: string): Promise<Pick<BaseTag, "name" | "count">[]>
    /**
     * Returns the post at a given ID.
     * @param id The ID of the post.
     */
    getPost(id: ID): Promise<Post | null>
    /**
     * Returns a class with methods for accessing each part of a post rather than most of the details at once.  
     * This can be preferred over {@linkcode Client.getPost} for cases such as API limits or when you only need to retrieve certain properties of a post.
     * @param id The ID of the post.
     */
    makePseudoPost(id: ID): PseudoPost
    /**
     * Returns an array of posts under a search query.
     * @param options The query used to search for posts.
     */
    search(options: string | SearchOptions): Promise<Post[]> // TODO: what is a 'change id'
    /**
     * Returns an array of tags listed as relevant to a search.
     * @param options The search query used to get relevant tags.
     */
    getRelevantTags(options: Omit<SearchOptions, "perPage">): Promise<PostTag[]>
    getTags(options: { limit: number }): Promise<PostTag[]>
    /**
     * Returns the tag at a given ID.
     * @param id The ID of the tag.
     */
    getTag(id: ID): Promise<PostTag | null>
}

/**
 * A post from Rule34.
 */
declare class Post {
    /**
     * The media files of the post.
     * 
     * The URL of each image is structured like so:
     * 
     * ```plain text
     * https://api-cdn.rule34.xxx/images/0123/0123456789abcdef.jpg
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

    /** The unique ID of the post. */
    id: number
    /** * The parent post's ID. */
    parent?: number
    /** The IDs of this post's children. */
    children: number[]
    /** The total upvotes of this post. */
    score: number

    /** The post's tameness rating. */
    rating: PostRating
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
}

/**
 * A class with methods that return particular parts of post data.
 */
declare class PseudoPost {
    /** The unique ID of the post. */
    id: number
    /**
     * Whether the ID is valid and associated with an accessible post.  
     * This value is `undefined` until a method of this instance is called.
     */
    valid?: boolean

    /** Returns the commments under the post. */
    getComments(): Promise<PostComment[]>
    /** Returns the tags associated with the post. */
    getTags(): Promise<PostTags>

    /** Returns the full original post. */
    fetch(): Promise<Post|null>
}

/**
 * A user on Rule34.
 */
declare class User {
    /** The username of the user. */
    name: string
    /** The unique ID of the user. */
    id: number
}

//#endregion

//#region interface

/**
 * An object used for authenticating Rule34 API requests.
 */
declare interface Authentication {
    /** The `user_id` parameter of the API key. */
    user_id: ID
    /** The `api_key` parameter of the API key. */
    api_key: string
}

/**
 * The base interface used for search objects.
 */
declare interface BaseSearchOptions {
    /** How many results to return. */
    perPage?: number
    /** The offset to use when getting results multiplied by `perPage`. */
    page?: number
    /** The offset to use when getting results. */
    offset?: number
}

/**
 * The additional properties used for searching regular posts.
 */
declare interface ActiveSearchOptions extends BaseSearchOptions {
    /** The search query to use. */
    query?: string | SearchQuery
    /**
     * Whether to show deleted posts.
     * @deprecated It is uncertain how exactly this is used. My attempts to fetch from any URL with the `deleted=show` parameter have refused to yield anything.
     */
    deleted?: boolean
}

/**
 * The additional properties used for searching deleted posts.
 */
interface DeletedSearchOptions extends BaseSearchOptions {
    /**
     * Whether to show deleted posts.
     * @deprecated It is uncertain how exactly this is used. My attempts to fetch from any URL with the `deleted=show` parameter have refused to yield anything.
     */
    deleted: true
    /** @deprecated It is uncertain how exactly this affects deleted post searches. */
    lastID?: ID
}

/**
 * A post media file.
 */
declare interface PostFile {
    /** The media's CDN URL. */
    url: string & {
        /**
         * Modify the URL to use a different CDN subdomain.
         * @param region The region to use.
         */
        changeServerRegion(region: PostFileServerRegion): void
        /**
         * Return the URL with a different CDN subdomain.
         * @param region The region to use.
         */
        withServerRegion(region: PostFileServerRegion): string
    }
    /** The dimensions of the media file. */
    size: [ width: number, height: number ]
}

/**
 * A comment under a post.
 */
declare interface PostComment {
    /** The author of the comment. */
    author: User
    /** The comment's content. */
    content: string
    /** The comment's unique ID. */
    id: ID
    /** The ID of the post this comment is under. */
    postId: ID
    /**
     * The date this post was created.
     * @deprecated This value is almost guaranteed to be inaccurate. This always, presumably by mistake, returns the date (specific to the timezone of Rule34's servers) that the comment was fetched.
     */
    createdAt: Date
}

/**
 * The base interface for Rule34 tags.
 */
declare interface BaseTag {
    /** The name and value of the tag. */
    name: string
    /** The unique ID of the tag. */
    id: ID
    /** The amount of posts that use this tag. */
    count: number
    /** The type of this tag. */
    type: PostTagType
    /** @warning It is uncertain what this property labels. */
    ambiguous: boolean
}

//#endregion

//#region type

declare type ID = `${number}`

declare type SearchOptions = ActiveSearchOptions | DeletedSearchOptions

declare type TagParameter = string | Pick<BaseTag, "name">

declare type SearchQuery = string | TagParameter[]

// TODO
declare type PostFileExtension =
    | "png"
    | "jpg"

declare type Tag = BaseTag

declare type PostTag = Pick<BaseTag, "name" | "count" | "type">

declare type PostTags = PostTag[] & { text(): string }

//#endregion

//#region enum

// TODO
declare enum PostFileServerRegion {
    API = "api-cdn",
    APIMP4 = "api-cdn-mp4"
}

declare enum PostFileType {
    Static,
    Animated,
    Video
}

declare enum PostRating {
    Safe,
    Questionable,
    Explicit
}

declare enum PostStatus {
    Active,
    Flagged,
    Deleted
}

declare enum PostTagType {
    Copyright,
    Character,
    Artist,
    General,
    Metadata,
    Ambiguous
}

//#endregion
