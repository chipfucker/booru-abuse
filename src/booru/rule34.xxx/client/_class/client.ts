import { ClientOptions } from "../_interface/client-options.ts";
import { setCredentials } from "../_function/credentials.ts";
import { ClientUser } from "./client-user.ts";
import { AutocompleteTag } from "../../site/tag/_class/autocomplete-tag.ts";
import { IdParameter } from "../../../../util/_type/id-parameter.ts";
import { Id } from "../../../../util/_type/id.ts";
import { Post } from "../../site/post/_class/post.ts";
import { Posts } from "../../site/post/_class/posts.ts";
import { parsePosts } from "../../raw/_function/parse-posts.ts";
import { parseInt } from "../../../../util/_function/integer.ts";
import * as URL from "../../site/url/_function/url.ts";
import type { RawPostJSON } from "../../raw/_interface/raw-json-post.ts";
import type { RawSearchXML } from "../../raw/_interface/raw-xml-post.ts";

/** A client to retrieve Rule34 data. */
export class Client {
    #user_id: Id;
    #api_key: string;
    
    /** Info regarding the user tied to the client. */
    self: ClientUser;

    constructor (options: ClientOptions) {
        options.auth.user_id = parseInt(options.auth.user_id as string);
        this.#api_key = options.auth.api_key;
        this.#user_id = options.auth.user_id;

        setCredentials(options.auth);

        this.self = new ClientUser({
            id: options.auth.user_id
        });
    }
    
    /**
     * Returns autocomplete suggestions for a given search.
     * @param query Search to get autocomplete suggestions for.
     */
    async autocomplete(query: string): Promise<AutocompleteTag[]> {
        const tags: AutocompleteTag[] = [];

        const response: { label: string, value: string }[]
            = await fetch(URL.autocomplete(query)).then(r => r.json());

        for (const tag of response)
            if (tag.value.match(/\\r\\n/)) break;
            else tags.push(new AutocompleteTag({
                name: tag.value,
                count: parseInt(tag.label.match(/(?<=\()\d+(?=\)$)/)![0])
            }));

        return tags;
    }

    /**
     * Returns the post at a given Id.
     * @param id The Id of the post.
     */
    async getPost(id: IdParameter): Promise<Post> {
        return await Post.fromURL({
            id: parseInt(id)
        });
    }

    /**
     * Returns posts resulting from a search query.
     * @param query The query to use when searching for posts.
     */
    async search(query: string, options: { perPage: number; page: number; }): Promise<Posts> {
        return await Posts.fromURL({
            query: query,
            limit: options.perPage,
            page: options.page
        });
    }
}
