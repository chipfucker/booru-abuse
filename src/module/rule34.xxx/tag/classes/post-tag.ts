import { TagType } from "../enums/tag-type.ts";
import type { BaseTag } from "../interfaces/base-tag.ts";
import type { Post } from "../../post/index.ts";

/** Tag found under the {@linkcode Post.tags tags} property of a {@linkcode Post Post}. */
export class PostTag<T extends TagType = TagType> implements Pick<BaseTag<T>, "name"|"count"|"type"> {
    name: string;
    count: number;
    type: T;

    static fromRaw(raw: { tag: string; count: number; type: string; }): PostTag {
        const tag = {
            name: raw.tag,
            count: raw.count,
            type: ({
                "copyright": TagType.Copyright,
                "character": TagType.Character,
                "artist":    TagType.Artist,
                "tag":       TagType.General,
                "metadata":  TagType.Metadata
            })[raw.type]  ?? TagType.Ambiguous
        };

        return new PostTag(tag);
    }

    constructor (tag: { name: string; count: number; type: T; }) {
        this.name = tag.name;
        this.count = tag.count;
        this.type = tag.type;
    }
}
