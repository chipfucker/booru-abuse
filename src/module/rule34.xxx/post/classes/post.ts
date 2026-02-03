import { fetchPostsJSON, fetchPostsXML } from "../functions/fetch-posts.ts";
import * as api from "../../util/functions/api-url.ts";
import type { Authentication } from "../../client/interfaces/authentication.ts";
import type { RawPostJSON } from "../interfaces/raw-post-json.ts";
import type { RawPostXML } from "../interfaces/raw-post-xml.ts";

export class Post {
    #auth: Authentication;
    private hasChildren: boolean;
    private commentCount: number;

    static async fromURL(url: { id: number; }, auth: Authentication): Promise<Post> {
        const urls = api.post(url, auth);
        const response = await Promise.all([
            fetchPostsJSON(urls.json), fetchPostsXML(urls.xml)
        ]).then(promises => ({
            json: promises[0],
            xml: promises[1].posts[0]!
        }));

        return Post.fromObject(response, auth);
    }

    static fromObject(objects: { json: RawPostJSON; xml: RawPostXML; }, auth: Authentication): Post {
        return new Post(objects, auth);
    }

    constructor ({ json, xml }: { json: RawPostJSON; xml: RawPostXML; }, auth: Authentication) {
        this.#auth = auth;
    }
}