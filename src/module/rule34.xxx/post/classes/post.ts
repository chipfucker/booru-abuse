import { PostAuthor } from "./post-author.ts";
import { PostFiles } from "./post-files.ts";
import { Posts } from "./posts.ts";
import { PostRating } from "../enums/post-rating.ts";
import { PostStatus } from "../enums/post-status.ts";
import { fetchPostsJSON, fetchPostsXML } from "../functions/fetch-posts.ts";
import { Comment } from "../../misc/classes/comment.ts";
import { PostTags } from "../../tag/classes/post-tags.ts";
import { fetchXML } from "../../../../util/functions/fetch-xml.ts";
import * as api from "../../util/functions/api-url.ts";
import type { RawPostJSON } from "../interfaces/raw-post-json.ts";
import type { RawPostXML } from "../interfaces/raw-post-xml.ts";
import type { Authentication } from "../../client/interfaces/authentication.ts";
import type { RawComment } from "../../misc/interfaces/raw-comment.ts";

/** A post. */
export class Post {
    #auth: Authentication;
    private hasChildren: boolean;
    private commentCount: number;

    /** The media files of the post. */
    file: PostFiles;

    /** The unique Id of the post. */
    id: number;
    /** The parent post's Id. */
    parent: number | null;
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

    /** The total upvotes of this post. */
    score: number;
    /** The tags associated with the post. */
    tags: PostTags;

    static async fromId(id: number, auth: Authentication): Promise<Post> {
        const urls = api.post({ id }, auth);
        const response = await Promise.all([
            // API REQUEST (post)
            fetchPostsJSON(urls.json),
            // API REQUEST (post)
            fetchPostsXML(urls.xml)
        ]).then(promises => ({
            json: promises[0][0]!,
            xml: promises[1].posts[0]!
        }));

        return Post.fromObject(response, auth);
    }

    static fromObject(object: { json: RawPostJSON; xml: RawPostXML; }, auth: Authentication): Post {
        return new Post(object, auth);
    }

    constructor ({ json, xml }: { json: RawPostJSON; xml: RawPostXML; }, auth: Authentication) {
        this.#auth = auth;
        this.hasChildren = xml.has_children === "true";
        this.commentCount = json.comment_count;

        this.file = PostFiles.fromObject({ json, xml });

        this.id = json.id;
        this.parent = json.parent_id || null;
        this.source = json.source;
        this.rating = ({
            "safe":         PostRating.Safe,
            "questionable": PostRating.Questionable,
            "explicit":     PostRating.Explicit
        })[json.rating]!;
        this.author = PostAuthor.fromObject({
            name: json.owner,
            id: parseInt(xml.creator_id)
        });

        this.created = new Date(xml.created_at);
        this.lastModified = new Date(json.change * 1000);
        this.status = ({
            "active":  PostStatus.Active,
            "flagged": PostStatus.Flagged,
            "deleted": PostStatus.Deleted
        })[json.status]!;

        this.score = json.score;
        this.tags = PostTags.fromRaw({
            string: json.tags,
            tags: json.tag_info
        });
    }

    /**
     * Returns all children of this post.
     * @apiRequests `2?`: Requests a JSON and XML search if children exist.
     */
    async getChildren(): Promise<Post[]> {
        if (!this.hasChildren) return [];
        else return await Posts.fromParams({
            query: `parent:${this.id}`,
            limit: 100,
            page: 0
        }, this.#auth)
        .then(posts => posts.toArray())
    }

    /**
     * Returns all comments under this post.
     * @apiRequests `1?`: Requests comments if they exist.
     */
    async getComments(): Promise<Comment[]> {
        if (!this.commentCount) return [];
        else {
            const url = api.comments({
                post_id: this.id
            }, this.#auth);
            // API REQUEST (comment)
            const raw = await fetchXML(url);
            const comments = raw.children.map(i => Comment.fromRaw(<any> i.attr as RawComment));
            return comments;
        }
    }
}