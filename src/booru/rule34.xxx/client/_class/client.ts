import { ClientOptions } from "../_interface/client-options.ts";
import { setCredentials } from "../_function/credentials.ts";
import { ClientUser } from "./client-user.ts";
import { AutocompleteTag } from "../../site/tag/_class/autocomplete-tag.ts";
import { IdParameter } from "../../../../util/_type/id-parameter.ts";
import { Id } from "../../../../util/_type/id.ts";
import { Post } from "../../site/post/_class/post.ts";
import { Posts } from "../../site/post/_class/posts.ts";
import { parsePosts } from "../../raw/_function/parse-posts.ts";
import * as URL from "../../site/url/_function/url.ts";
import type { RawPostJSON } from "../../raw/_interface/raw-json-post.ts";
import type { RawPostsXML } from "../../raw/_interface/raw-xml-post.ts";

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
        const URLs = URL.post(parseInt(id as string));

        const response = await Promise.all([
            fetch(URLs.json).then(r => r.json()),
            fetch(URLs.xml).then(r => r.text()).then(parsePosts)
        ]).then(promises => ({
            json: promises[0] as RawPostJSON[],
            xml: promises[1] as RawPostsXML
        }));

        return new Post({ post: {
            json: response.json[0],
            xml: response.xml.posts[0]
        }});
    }

    /**
     * Returns posts resulting from a search query.
     * @param query The query to use when searching for posts.
     */
    async search(query: string, options: { perPage: number; page: number; }): Promise<Posts> {
        const URLs = URL.search({
            query: query,
            limit: options.perPage,
            page: options.page
        });

        const response = await Promise.all([
            fetch(URLs.json).then(r => r.json()),
            fetch(URLs.xml).then(r => r.text()).then(parsePosts)
        ]).then(promises => ({
            json: promises[0] as RawPostJSON[],
            xml: promises[1] as RawPostsXML
        }));

        return new Posts({
            count: parseInt(response.xml.count),
            offset: parseInt(response.xml.offset),
            json: response.json,
            xml: response.xml.posts
        });
    }
}
