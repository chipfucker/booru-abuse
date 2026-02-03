import { PostAuthor } from "./post-author.ts";
import { PostFiles } from "./post-files.ts";
import { PostRating } from "../enums/post-rating.ts";
import { PostStatus } from "../enums/post-status.ts";
import { fetchPostsJSON, fetchPostsXML } from "../functions/fetch-posts.ts";
import * as api from "../../util/functions/api-url.ts";
import type { RawPostJSON } from "../interfaces/raw-post-json.ts";
import type { RawPostXML } from "../interfaces/raw-post-xml.ts";
import type { Authentication } from "../../client/interfaces/authentication.ts";

/** A post from rule34.xxx. */
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
    /** The creator of the post. */
    author: PostAuthor;
    
    /** The date this post was created. */
    created: Date;
    /** The date this post was last updated. */
    lastModified: Date;
    /** The post's display status. */
    status: PostStatus;

    static async fromId(id: number, auth: Authentication): Promise<Post> {
        const urls = api.post({ id }, auth);
        const response = await Promise.all([
            fetchPostsJSON(urls.json), fetchPostsXML(urls.xml)
        ]).then(promises => ({
            json: promises[0],
            xml: promises[1].posts[0]!
        }));

        return Post.fromObject(response, auth);
    }

    static fromObject(object: { json: RawPostJSON; xml: RawPostXML; }, auth: Authentication): Post {
        return new Post(object, auth);
    }

    constructor ({ json, xml }: { json: RawPostJSON; xml: RawPostXML; }, auth: Authentication) {
        this.#auth = auth;
    }
}