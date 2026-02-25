import { PostTag } from "./post-tag.ts";
import type { TagType } from "../enums/tag-type.ts";
import type { RawPostJSON } from "../../api/raw/interface/raw-posts-json.ts";

/** Array of tags found under a post. */
export class PostTags extends Array<PostTag> {
    protected string: string;

    static fromRaw(raw: RawPostJSON<true>) {
        return this.fromObject({
            string: raw.tags,
            tags: raw.tag_info.map(PostTag.fromRaw)
        });
    }

    static fromObject(object: ConstructorParameters<typeof this>[0]) {
        return new this(object);
    }

    protected constructor (object: { string: string; tags: PostTag[] }) {
        super(...object.tags);
        this.string = object.string;
    }

    ofCategory<T extends TagType>(category: T): PostTag<T>[] {
        return this.filter(tag => tag.type === category);
    }

    override toString(): string { return this.string; }
}