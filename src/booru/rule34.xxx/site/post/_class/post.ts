import { Posts } from "./posts.ts";
import { PostFiles } from "../file/_class/post-file.ts";
import { PostAuthor } from "../_class/post-author.ts";
import { PostRating } from "../_enum/post-rating.ts";
import { PostStatus } from "../_enum/post-status.ts";
import { PostTag } from "../../tag/_class/post-tag.ts";
import { PostTags } from "../../tag/_class/post-tags.ts";
import { Comment } from "../../_class/comment.ts";
import { getURL } from "../../url/get-url/_function/post.ts";
import { parsePosts } from "../../../raw/_function/parse-posts.ts";
import { parseComments } from "../../../raw/_function/parse-comments.ts";
import * as URL from "../../url/_function/url.ts";
import type { RawPostJSON } from "../../../raw/_interface/raw-json-post.ts";
import type { RawPostXML } from "../../../raw/_interface/raw-xml-post.ts";

/** A post from rule34.xxx. */
export class Post {
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

    /** The total upvotes of this post. */
    score: number;
    /** The tags associated with the post. */
    tags: PostTags;

    static async fromURL(url: { id: number; }) {
        const URLs = URL.post(url.id);
        const response = await Promise.all([
            fetch(URLs.json).then(r => r.json()),
            fetch(URLs.xml).then(r => r.text()).then(parsePosts)
        ]).then(promises => ({
            json: promises[0] as RawPostJSON,
            xml: promises[1].posts[0] as RawPostXML
        }));

        return Post.fromObject(response);
    }

    static fromObject(objects: { xml: RawPostXML; json: RawPostJSON; }): Post {
        return new Post(objects);
    }

    constructor ({ xml, json }: { xml: RawPostXML; json: RawPostJSON; }) {
        this.hasChildren = xml.has_children === "true";
        this.commentCount = json.comment_count;

        this.file = new PostFiles({ xml, json });

        this.id = json.id;
        if (json.parent_id) this.parent = json.parent_id;
        this.source = json.source
        this.rating = (() => { switch (json.rating) {
            case "safe":         return PostRating.Safe;
            case "questionable": return PostRating.Questionable;
            case "explicit":     return PostRating.Explicit;
        }})();
        this.author = new PostAuthor({
            name: json.owner,
            id: parseInt(xml.creator_id)
        });

        this.created = new Date(xml.created_at);
        this.lastModified = new Date(json.change * 1000);
        this.status = (() => { switch (json.status) {
            case "active":  return PostStatus.Active;
            case "flagged": return PostStatus.Flagged;
            case "deleted": return PostStatus.Deleted;
        }})();

        this.score = json.score;
        this.tags = new PostTags({
            string: json.tags,
            tags: json.tag_info.map(tag => new PostTag(tag))
        });
    }

    /** Returns all children of this post. */
    async getChildren(): Promise<Post[]> {
        if (!this.hasChildren) return [];
        else return Array.from(await Posts.fromURL({
            query: `paremt:${this.id}`,
            limit: 100,
            page: 0
        }));
    }

    /** Returns the commments under the post. */
    async getComments(): Promise<Comment[]> {
        if (!this.commentCount) return [];
        else {
            const url = URL.comments(this.id);
            const raw = await fetch(url).then(r => r.text()).then(parseComments);
            const comments = raw.map(i => new Comment(i));
            return comments;
        }
    }

    /**
     * Returns a URL to this post on rule34.xxx.
     * @param query The search to apply to the URL.
     */
    toURL = (query?: string) => getURL(this.id, query);
}
