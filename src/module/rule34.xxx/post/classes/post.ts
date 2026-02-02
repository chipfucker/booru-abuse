import { fetchJSON } from "../../../../util/functions/fetch-json.ts";
import { fetchPostsXML } from "../functions/fetch-posts.ts";
import * as api from "../../util/functions/api-url.ts";
import type { Authentication } from "../../client/interfaces/authentication.ts";

export class Post {
    #auth: Authentication;
    private hasChildren: boolean;
    private commentCount: number;

    static async fromURL(url: { id: number; }, auth: Authentication): Promise<Post> {
        const urls = api.post(url, auth);
        const response = await Promise.all([
            fetchJSON(urls.json), fetchPostsXML(urls.xml)
        ]).then(promises => ({
            json: promises[0],
            xml: promises[1].posts[0]
        }));

        return Post.fromObject(response, auth);
    }

    static fromObject(objects: { json: any; xml: any; }, auth: Authentication): Post {
        return new Post(objects, auth);
    }

    constructor ({ json, xml }: { json: any; xml: any; }, auth: Authentication) {
        this.#auth = auth;
    }
}