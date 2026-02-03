import { PostFiles } from "./post-files.ts";
import { PostRating } from "../enums/post-rating.ts";
import { fetchPostsJSON, fetchPostsXML } from "../functions/fetch-posts.ts";
import * as api from "../../util/functions/api-url.ts";
import type { RawPostJSON } from "../interfaces/raw-post-json.ts";
import type { RawPostXML } from "../interfaces/raw-post-xml.ts";
import type { Authentication } from "../../client/interfaces/authentication.ts";

export class Post {
    #auth: Authentication;
    private hasChildren: boolean;
    private commentCount: number;

    /** The media files of the post. */
    file: PostFiles;

    /** The unique Id of the post. */
    id: number;
    /** The parent post's Id. */
    parent?: number;
    /**
     * The source attributed to this post.  
     * Typically a URL.
     */
    source: string;
    // TODO: better word for 'maturity?'
    /** The post's 'maturity' rating. */
    rating: PostRating;

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