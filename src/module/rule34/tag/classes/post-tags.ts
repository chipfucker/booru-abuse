import { PostTag } from "./post-tag.ts";
import type { TagType } from "../enums/tag-type.ts";
import type { RawPostJSON } from "../../api/raw/interface/raw-posts-json.ts";

/** Array of tags found under a post. */
export class PostTags extends Array<PostTag> {
    protected string: string;
    
    ofCategory<T extends TagType>(category: T): PostTag<T>[] {
        return this.filter(tag => tag.type === category) as PostTag<T>[];
    }

    override toString(): string { return this.string; }

    constructor (object: { string: string; tags: PostTag[] }) {
        super(...object.tags);
        this.string = object.string;
    }

    static fromRaw(raw: RawPostJSON<true>) {
        return new this({
            string: raw.tags,
            tags: raw.tag_info.map(i => PostTag.fromRaw(i))
        });
    }
}