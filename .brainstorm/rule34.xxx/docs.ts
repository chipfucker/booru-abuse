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
     * Returns the post at a given Id.
     * @param id The Id of the post.
     */
    getPost(id: Id): Promise<Post | null>
    /**
     * Returns a class with methods for accessing each part of a post rather than most of the details at once.  
     * This can be preferred over {@linkcode Client.getPost} for cases such as API limits or when you only need to retrieve certain properties of a post.
     * @param id The Id of the post.
     */
    makePseudoPost(id: Id): PseudoPost
    /**
     * Returns an array of posts under a search query.
     * @param options The query used to search for posts.
     */
    search(options: string | SearchOptions): Promise<Post[]> // TODO: what is a 'change id'
    // TODO: figure out how relevant tags are decided or see if the API supports it
    /**
     * Returns an array of tags listed as relevant to a search.
     * @param options The search query used to get relevant tags.
     */
    getRelevantTags(options: Omit<SearchOptions, "perPage">): Promise<PostTag[]>
    getTags(options: { limit: number }): Promise<PostTag[]>
    /**
     * Returns the tag at a given Id.
     * @param id The Id of the tag.
     */
    getTag(id: Id): Promise<PostTag | null>
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
    /** * The parent post's Id. */
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
}

/**
 * A class with methods that return particular parts of post data.
 */
declare class PseudoPost {
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

    /** Returns the full original post. */
    fetch(): Promise<Post|null>
}

/**
 * Tags retrieved from a post.
 */
declare class PostTags extends Array<PostTag> {
    category<T extends TagType>(category: T): PostTag<T>[]
    text(): string
}

/**
 * A user on Rule34.
 */
declare class User {
    /** The username of the user. */
    name: string
    /** The unique Id of the user. */
    id: number
}

//#endregion

//#region function

//#endregion

//#region variable

//#endregion

//#region interface

/**
 * An object used for authenticating Rule34 API requests.
 */
declare interface Authentication {
    /** The `user_id` parameter of the API key. */
    user_id: Id
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
declare interface DeletedSearchOptions extends BaseSearchOptions {
    /**
     * Whether to show deleted posts.
     * @deprecated It is uncertain how exactly this is used. My attempts to fetch from any URL with the `deleted=show` parameter have refused to yield anything.
     */
    deleted: true
    /** @deprecated It is uncertain how exactly this affects deleted post searches. */
    lastId?: Id
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
declare interface PostComment {
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
     * @deprecated This value is almost guaranteed to be inaccurate. This always, presumably by mistake, returns the date (specific to the timezone of Rule34's servers) that the comment was fetched.
     */
    createdAt: Date
}

/**
 * The base interface for Rule34 tags.
 */
declare interface BaseTag<T extends TagType = TagType> {
    /** The name and value of the tag. */
    name: string
    /** The unique Id of the tag. */
    id: Id
    /** The amount of posts that use this tag. */
    count: number
    /** The type of this tag. */
    type: T
    /** @warning It is uncertain what this property labels. */
    ambiguous: boolean
}

//#endregion

//#region type

/** A number used as a unique identifier. */
declare type Id = number | `${number}`

/** Options used when searching for posts. */
declare type SearchOptions = ActiveSearchOptions | DeletedSearchOptions

/** Tag used when searching for posts. */
declare type TagParameter = string | Pick<BaseTag, "name">

/** Query used when searching for posts. */
declare type SearchQuery = string | TagParameter[]

// TODO
/** Possible file extensions for a post's media. */
declare type PostFileExtension =
    | "png"
    | "jpg"

/** Full tag, usually retrieved from getting a tag directly. */
declare type Tag = BaseTag

/** Partial tag retrieved from a post. */
declare type PostTag<T extends TagType = TagType> = Pick<BaseTag<T>, "name" | "count" | "type">

//#endregion

//#region enum

// TODO: missing properties
/**
 * Rule34's regional CDN servers for media files.  
 * Used when replacing the subdomain of file URLs.
 */
declare enum CDNServer { // TODO: better enum name?
    /** The image CDN dedicated to APIs. */
    API = "api-cdn",
    /** The video CDN dedicated to APIs. */
    APIMP4 = "api-cdn-mp4"
}
/** Alias for the {@link CDNServer `CDNServer` enum}. */
declare type PostFileServerRegion = CDNServer

// TODO: better word for 'animation states?'
/** The possible animation states of a post's media file. */
declare enum PostFileType {
    /** A still image&mdash;no animation or audio. */
    Static,
    /** An animated, looped image&mdash;no playback control or audio. */
    Animated,
    /** An animated video. */
    Video
}

// TODO: better word for 'maturity?'
/** The possible 'maturity' ratings of a post. */
declare enum PostRating {
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
declare enum PostStatus {
    /** Unmarked. */
    Active,
    /** Reported and yet to be reviewed. */
    Flagged,
    /** Not visible. */
    Deleted
}

/** The possible types a tag can have. */
declare enum TagType {
    /** A copyright, such as a series, brand, or franchise. */
    Copyright,
    /** A character, type of character, or a cover for a vague character description. */
    Character,
    /** An artist alias, or a tag asking for help finding and tagging with the correct artist, such as `artist_request`. */
    Artist,
    /** A visual, activity, interest, or a tag that otherwise wouldn't suit any other tag type. */
    General,
    /** Image metadata, such as dimensions, animation, or calls for help, such as `tagme`. */
    Metadata,
    /**
     * An errenous type, such as when a tag's type is labelled `null`.  
     * Typically displayed as if a {@linkcode TagType.General General} tag.
     */
    Ambiguous
}

//#endregion
