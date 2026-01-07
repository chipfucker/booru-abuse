//#region class

declare class Client {
    constructor({ auth, config }: {
        auth: Auth
        config?: {
        }
    })
    
    autocomplete(query: string): Promise<Omit<PostTag, "type">[]>
    getPost(id: ID): Promise<Post | null>
    search(options: string | SearchOptions): Promise<Post[]> // TODO: what is a 'change id'
    getRelevantTags(options: Omit<SearchOptions, "perPage">): Promise<PostTag[]>
    getTags(options: any): Promise<PostTag[]> // TODO
    getTag(id: ID): Promise<PostTag | null>
    getComments(postId?: ID): Promise<PostComment[]>
}

declare class Post {
    file: PostFile & {
        sample: PostFile & {
            isAppropriate(): boolean // TODO: better method name?
        }
        thumbnail: PostFile
        directory: number
        hash: string
        extension: string
    }

    id: number
    parent?: number
    children: number[]
    score: number

    rating: PostRating
    status: PostStatus

    author: User // TODO: better property name?
    createdAt: Date
    updatedAt: Date

    source: string
    notes: PostNote[]

    getComments(): Promise<PostComment[]>
    tags: PostTag[] & { getText(): string }
}

declare class User {
    name: string
    id: number
}

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
    url: string
    size: [ width: number, height: number ]
}

// TODO
declare interface PostNote {
    area: {
        position: [ x: number, y: number ]
        size: [ width: number, height: number ]
    }
    content: string
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

//#endregion

//#region enum

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
