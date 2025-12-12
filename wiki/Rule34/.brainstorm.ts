//#region class

declare class Client {
    async constructor({ auth, config }: {
        auth: Authentication
        config?: {
            coorsVirtue: boolean
        }
    })

    static getAuth(credentials: {
        username: string
        password: string
    }): Authentication
    
    getPost(id: ID): Promise<Post|null>
    search(query: string): Promise<Post[]>
    relevantTags(query: string)
    autocomplete(query: string): Promise<PostTag[] | Omit<PostTag, "type">[]>
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
}

declare interface PostTag {
    name: string
    posts: number
    type: TagType
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
