//#region class

declare class Client {
    constructor({ auth, config }: {
        /**
         * Authorization for API access.
         */
        auth: Auth
        /**
         * Client configuration object.
         */
        config?: {
        }
    })
    
    /**
     * Returns autocomplete suggestions for a given search.
     * @param query Search to get autocomplete suggestions for.
     */
    autocomplete(query: string): Promise<Omit<PostTag, "type">[]>
    /**
     * Returns the post at a given ID.
     * @param id The ID of the post.
     */
    getPost(id: ID): Promise<Post | null>
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
    /**
     * Returns the tag at a given ID.
     * @param id The ID of the tag.
     */
    getTag(id: ID): Promise<PostTag | null>
}

const butt = await fetch("https://hi/");
const poop = new Post();

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
        /**
         * The file's type.
         */
        type: PostFileType
        /**
         * The file's extension.
         */
        extension: PostFileExtension
        /**
         * A resampled, smaller version of the main file.
         * 
         * This file is always a static image&mdash;it is not animated.
         */
        resampled: PostFile & {
            /**
             * Get whether the resample is necessary, judged by whether Rule34 displays it by default.
             */
            isAppropriate(): boolean // TODO: better method name?
        }
        /**
         * A much smaller version of the main file for thumbnail purposes.
         */
        thumbnail: PostFile
        /**
         * The directory of the post's files.
         */
        directory: number
        /**
         * The hash name of the post's files.
         */
        hash: string
    }

    /**
     * The unique ID of the post.
     */
    id: number
    /**
     * The parent post's ID.
     */
    parent?: number
    /**
     * The IDs of this post's children.
     */
    children: number[]
    /**
     * The total upvotes of this post.
     */
    score: number

    /**
     * The post's tameness rating.
     */
    rating: PostRating
    status: PostStatus

    author: User // TODO: better property name?
    createdAt: Date
    updatedAt: Date

    source: string

    getComments(): Promise<PostComment[]>
    tags: PostTags
}

declare class PseudoPost {
    id: number
    getComments(): Promise<PostComment[]>
    getTags(): Promise<PostTags>
}

declare class User {
    name: string
    id: number
}

//#endregion

//#region function

declare function post(id: ID): PseudoPost

//#endregion

//#region interface

declare interface Auth {
    user_id: string
    api_key: string
}

declare interface SearchOptions {
    query?: string | SearchQuery
    perPage?: number
    page?: number
    offset?: number
    deleted?: boolean
    earliestDeletedID?: ID
}

declare interface PostFile {
    url: string & {
        changeServerRegion(region: PostFileServerRegion): void
        withServerRegion(region: PostFileServerRegion): string
    }
    size: [ width: number, height: number ]
}

// TODO
declare interface PostComment {
    author: User
    content: string
    id: number
    postId: number
}

declare interface PostTag {
    name: string
    id?: number
    posts: number
    type: PostTagType
}

// TODO
declare interface PostChange {
    date: Date
    diff: {
        tags: {
            add: string[]
            remove: string[]
        }
    }
    state: Post
}

//#endregion

//#region type

declare type UserAuth = Pick<Auth, "pass_hash" | "user_id">

declare type ID = number | `${number}`

declare type TagParameter = string | Pick<PostTag, "name">

declare type SearchQuery = string | TagParameter[]

// TODO
declare type PostFileExtension =
    | "png"
    | "jpg"

declare type PostTags = PostTag[] & { text(): string }

//#endregion

//#region enum

// TODO
declare enum PostFileServerRegion {
    API = "api-cdn",
    APIMP4 = "api-cdn-mp4"
}

// TODO
declare enum PostFileVariant {
    Main = "images",
    Resampled = "sample",
    Thumbnail = "thumb"
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
