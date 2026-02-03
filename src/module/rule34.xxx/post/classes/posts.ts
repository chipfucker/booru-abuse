import { Post } from "./post.ts";
import { fetchPostsJSON, fetchPostsXML } from "../functions/fetch-posts.ts";
import * as api from "../../util/functions/api-url.ts";
import type { RawPostJSON } from "../interfaces/raw-post-json.ts";
import type { RawPostXML, RawSearchXML } from "../interfaces/raw-post-xml.ts";
import type { Authentication } from "../../client/index.ts";

export class Posts extends Array<Post> {
    // @ts-ignore TS6133
    #auth: Authentication;

    /** Query used to fetch the following posts. */
    query: string;
    /** Amount of posts that match the query. */
    count: number;
    /** The offset of the returned results. */
    offset: number;

    static async fromParams(params: { query: string; limit: number; page: number; }, auth: Authentication): Promise<Posts> {
        const url = api.search({
            tags: params.query,
            limit: params.limit,
            pid: params.page
        }, auth);
        const responses = await Promise.all([
            fetchPostsJSON(url.json),
            fetchPostsXML(url.xml)
        ]).then(promise => ({
            json: promise[0],
            xml: promise[1]
        }));

        return Posts.fromRawEach(params.query, responses, auth);
    }

    static fromRawEach(query: string, { json, xml }: { json: RawPostJSON[], xml: RawSearchXML }, auth: Authentication): Posts {
        const merged: { json: RawPostJSON; xml: RawPostXML }[] = [];
        json.forEach((_, i) =>
            merged.push({ json: json[i]!, xml: xml.posts[i]! })
        );

        return Posts.fromObject({
            query: query,
            count: parseInt(xml.count),
            offset: parseInt(xml.offset),
            posts: merged
        }, auth);
    }

    static fromObject(object: {
        query: string;
        count: number;
        offset: number;
        posts: { json: RawPostJSON; xml: RawPostXML; }[];
    }, auth: Authentication): Posts {
        const properties = {
            query: object.query,
            count: object.count,
            offset: object.offset,
            posts: object.posts.map(post => Post.fromObject(post, auth))
        };

        return new Posts(properties, auth);
    }

    constructor (options: {
        query: string;
        count: number;
        offset: number;
        posts: Post[];
    }, auth: Authentication) {
        super(...options.posts);
        this.#auth = auth;
        this.query = options.query;
        this.count = options.count;
        this.offset = options.offset;
    }

    toArray = (): Post[] => Array.from(this);
}