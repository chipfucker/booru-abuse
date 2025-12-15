//#region class

declare class Client {
    async constructor({ auth, config }: {
        auth: Authentication
        config?: {
            coorsVirtue: boolean
        }
    })
    
    autocomplete(query: string): Promise<PostTag[] | Omit<PostTag, "type">[]>
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
    getChanges(): Promise<PostChange[]>

    source: string
    notes: PostNote[]

    getComments(): Promise<PostComment[]>
    tags: PostTag[] & { getText(): string }

    // The following should throw an error if post's owner isn't client
    comment({ auth, body }: { auth?: Authentication, body: string }): Promise<PostComment>
    edit({ auth, options }: { auth?: Authentication, options: any }): Promise<Post> // TODO
    delete({ auth }: { auth?: Authentication }): Promise<void>
}

declare class User {
    name: string
    id: number
}

//#endregion

//#region interface

declare interface Authentication {
    user_id: string
    pass_hash: string
    api_key: string
}

declare interface SearchOptions {
    query?: string
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
    area: [
        position: [ x: number, y: number ],
        size: [ width: number, height: number ]
    ]
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
    posts: number
    type: PostTagType
}

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

declare type ID = number | `${number}`

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
