import { ClientUser } from "./client-user.ts";
import { Post } from "../../post/classes/post.ts";
import { Posts } from "../../post/classes/posts.ts";
import { AutocompleteTags } from "../../tag/classes/autocomplete-tags.ts";
import type { Authentication } from "../interfaces/authentication.ts";
import type { ClientOptions } from "../interfaces/client-options.ts";

/** A client to retrieve date from rule34.xxx. */
export class Client {
    #auth: Authentication;
    
    /** Info regarding the user tied to the client. */
    self: ClientUser;

    constructor (options: ClientOptions) {
        this.#auth = options.auth;
        this.self = ClientUser.fromAuth(options.auth);
    }
    
    /**
     * Returns autocomplete suggestions for a given search.
     * @param query Search to get autocomplete suggestions for.
     */
    async autocomplete(query: string): Promise<AutocompleteTags> {
        return await AutocompleteTags.fromQuery(query);
    }
    
    /**
     * Returns the post at a given Id.
     * @param id The Id of the post.
     * @apiRequests 2: post(json, xml)
     */
    async getPost(id: number): Promise<Post> {
        // API REQUEST (post) *2
        return await Post.fromId(id, this.#auth);
    }

    /**
     * Returns posts resulting from a search query.
     * @param query The query to use when searching for posts.
     * @param options Options to modify the returned results.
     * @apiRequests 2: post(json, xml)
     */
    async search(query: string, options: { perPage: number; page: number; }): Promise<Posts> {
        // API REQUEST (post) *2
        return await Posts.fromParams({
            query: query,
            limit: options.perPage,
            page: options.page
        }, this.#auth);
    }
}
