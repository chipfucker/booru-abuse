import { ClientUser } from "./client-user.ts";
import { missingAuthentication } from "../variables/missing-authentication.ts";
import { Post } from "../../post/classes/post.ts";
import { Posts } from "../../post/classes/posts.ts";
import { AutocompleteTags } from "../../tag/classes/autocomplete-tags.ts";
import * as api from "../../util/functions/api-url.ts";
import type { Authentication } from "../interfaces/authentication.ts";
import type { ClientOptions } from "../interfaces/client-options.ts";

/** A client to retrieve date from rule34.xxx. */
export class Client {
    #auth: Authentication;
    private authorized: boolean = false;
    
    /** The user tied to the client. */
    self: ClientUser;

    /** Returns a client, or throws an error if the credentials are invalid. */
    static async create(options: ClientOptions): ReturnType<Client["test"]> {
        return await new Client(options).test();
    }

    private constructor (options: ClientOptions) {
        this.#auth = options.auth;
        this.self = ClientUser.fromAuth(options.auth);
    }

    /** Returns the client, or throws an error if the credentials are invalid. */
    async test(): Promise<this|never> {
        if (!this.authorized) {
            const response = await fetch(api.search({
                tags: "",
                limit: 0,
                pid: 0
            }, this.#auth).json).then(r => r.text());

            if (response === missingAuthentication)
                throw new Error("Invalid authentication! Make sure you've provided the necessary credentials correctly.");
            this.authorized = true;
        }
            
        return this;
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
     * @param id The unique Id of the post.
     * @apiRequests `2`: Requests a JSON and XML search.
     */
    async getPost(id: number): Promise<Post> {
        // API REQUEST (post) *2
        return await Post.fromId(id, this.#auth);
    }

    /**
     * Returns posts resulting from a search query.
     * @param query The query to use when searching for posts.
     * @apiRequests `2`: Requests a JSON and XML search.
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
