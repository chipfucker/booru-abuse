import { Post } from "./post.ts";
import { parsePosts } from "../../../raw/_function/parse-posts.ts";
import { parseInt } from "../../../../../util/_function/integer.ts";
import * as URL from "../../url/_function/url.ts";
import type { RawPostJSON } from "../../../raw/_interface/raw-json-post.ts";
import type { RawPostXML, RawSearchXML } from "../../../raw/_interface/raw-xml-post.ts";

export class Posts extends Array<Post> {
    /** Amount of posts that match this query. */
    count: number;
    /** The offset of results. */
    offset: number;

    static async fromURL(params: { query: string; limit: number; page: number; }): Promise<Posts> {
        const URLs = URL.search(params);

        const response = await Promise.all([
            fetch(URLs.json).then(r => r.json()),
            fetch(URLs.xml).then(r => r.text()).then(parsePosts)
        ]).then(promises => ({
            json: promises[0] as RawPostJSON[],
            xml: promises[1] as RawSearchXML
        }));
        
        return Posts.fromObject(response);
    }

    static fromObject({ json, xml }: { json: RawPostJSON[]; xml: RawSearchXML }): Posts {
        const merged: { json: RawPostJSON; xml: RawPostXML }[] = [];
        json.forEach((_, i) =>
            merged.push({ json: json[i], xml: xml.posts[i] })
        );

        const posts: Post[] = [];
        merged.forEach(item => posts.push(Post.fromObject(item)));

        return new Posts({
            count: parseInt(xml.count),
            offset: parseInt(xml.offset),
            posts: posts
        })
    }

    constructor (options: ConstructorOptions) {
        super(...options.posts);
        this.count = options.count;
        this.offset = options.offset;
    }
}

interface ConstructorOptions {
    count: number;
    offset: number;
    posts: Post[]
}
