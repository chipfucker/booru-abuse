import { fetchJSON } from "../../../../util/functions/fetch-json.ts";
import { fetchXMLPosts } from "../functions/fetch-xml-post.ts";
import * as api from "../../util/functions/api-url.ts";
import type { RawPostJSON } from "../interfaces/raw-post-json.ts";
import type { RawPostXML } from "../interfaces/raw-post-xml.ts";
import type { Authentication } from "../../client/interfaces/authentication.ts";

export class Post {
    #auth: Authentication;
    private hasChildren: boolean;
    private commentCount: number;

    static async fromURL(url: { id: number; }, auth: Authentication): Promise<Post> {
        const urls = api.post(url, auth);
        const response = await Promise.all([
            fetchJSON(urls.json), fetchXMLPosts(urls.xml)
        ]).then(promises => ({
            json: promises[0] as RawPostJSON,
            xml: <any> promises[1].posts[0]
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