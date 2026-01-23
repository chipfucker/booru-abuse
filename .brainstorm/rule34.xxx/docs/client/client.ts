import { Authentication } from "./Authentication"
import { User } from "../site/User"
import { BaseTag } from "../site/tag/interface"
import { Id } from "../types/generic"
import { Post } from "../site/post/Post"
import { PseudoPost } from "../site/post/PseudoPost"
import { SearchOptions } from "../site/search/type"
import { Tag, PostTag } from "../site/tag/type"

/**
 * A client to retrieve and parse Rule34 data.
 */
export declare class Client {
    constructor({ auth, config }: {
        /** Authorization for API access. */
        auth: Authentication
        /** Client configuration object. */
        config?: {
        }
    })

    /** Info regarding the user of the client. */
    self: Pick<User, "id">

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
    getTags(options: { limit: number }): Promise<Tag[]>
    /**
     * Returns the tag at a given Id.
     * @param id The Id of the tag.
     */
    getTag(id: Id): Promise<Tag | null>
}
