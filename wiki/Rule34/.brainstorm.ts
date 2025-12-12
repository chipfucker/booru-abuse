//#region class

declare class Client {
    async constructor({ auth, config }: {
        auth: Authentication
        config?: {
            coorsVirtue: boolean // browser compatibility?
        }
    })

    static getAuth(credentials: {
        username: string
        password: string
    }): Authentication
    
    getPost(id: number | string): Promise<Post|null> // TODO: https://reddit.com/r/typescript/comments/1h7g91b
    search(options: SearchOptions): Promise<Post[]>
}

declare class Post {
    file: PostFile & {
        sample: PostFile & {
            isAppropriate(): boolean // TODO: better method name?
        }
        thumbnail: PostFile
        directory: number
        hash: string
        mimetype: string
    }

    id: number
    parent?: number
    score: number

    rating: PostRating
    status: PostStatus

    author: User // TODO: better property name?
    updatedAt: Date
    createdAt: Date

    source: string
    notes?: PostNote[]

    getComments(): Promise<PostComment[]>
    tags: PostTag[] & { getText(): string } // TODO: better property name (text)?

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
    size: [ number, number ]
}

// TODO
declare interface PostNote {
    area: [[ number, number ], [ number, number ]]
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

declare type PostTags = string | string[] | PostTag | PostTag[]

declare type PostOptions = PostTags | {
    query: PostTags
    vanilla: boolean
}

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
