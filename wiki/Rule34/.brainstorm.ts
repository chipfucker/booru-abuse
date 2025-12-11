//#region class Client
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
}

//#region class

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

    creator: { // TODO: better property name?
        name: string
        id: number
    }
    updatedAt: Date
    createdAt: Date

    source: string
    notes?: PostNote[]

    getComments(): Promise<PostComment[]>
    tags: PostTag[] & { pre: string } // TODO: better property name (pre)?

    // The following should throw an error if post's owner isn't client
    comment(options: { auth?: Authentication, body: string }): Promise<PostComment>
    edit(options: { auth?: Authentication }): Promise<Post> // TODO
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
    width: number
    height: number
}

declare interface PostNote {

}

declare interface PostComment {

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

declare enum TagType {
    Copyright,
    Character,
    Artist,
    General,
    Metadata,
    Ambiguous
}

//#endregion
