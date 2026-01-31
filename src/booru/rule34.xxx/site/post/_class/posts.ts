import { Post } from "./post.ts";
import type { RawPostJSON } from "../../../raw/_interface/raw-json-post.ts";
import type { RawPostXML } from "../../../raw/_interface/raw-xml-post.ts";

export class Posts extends Array<Post> {
    count: number;
    offset: number;

    constructor (options: ConstructorOptions) {
        const merged: { json: RawPostJSON, xml: RawPostXML }[] = [];
        for (const i in options.json) {
            merged.push({ json: options.json[i], xml: options.xml[i] });
        }

        const posts: Post[] = [];
        merged.forEach(item => posts.push(
            new Post({ post: {
                json: item.json,
                xml: item.xml
            }})
        ));

        super(...posts);

        this.count = options.count;
        this.offset = options.offset;
    }
}

interface ConstructorOptions {
    count: number;
    offset: number;
    json: RawPostJSON[];
    xml: RawPostXML[];
}
