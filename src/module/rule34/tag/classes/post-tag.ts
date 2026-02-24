import { TagType } from "../enums/tag-type.ts";
import type { BaseTag } from "../interfaces/base-tag.ts";
import type { RawPostJSON } from "../../api/raw/interface/raw-posts-json.ts";

/** A tag attributed to  a post. */
export class PostTag<T extends TagType = TagType>
implements Pick<BaseTag<T>, "name" | "count" | "type"> {
    name: string;
    count: number;
    type: T;

    static RAW_TAG_TYPE = {
        "copyright": "Copyright",
        "character": "Character",
        "artist": "Artist",
        "tag": "General",
        "metadata": "Metadata",
        [null]: "Ambiguous"
    } satisfies {
        [K in RawPostJSON<true>["tag_info"][number]["type"]]:
            keyof typeof TagType;
    }

    static fromRaw(raw: RawPostJSON<true>["tag_info"][number]) {
        return this.fromObject({
            name: raw.tag,
            count: raw.count,
            type: this.RAW_TAG_TYPE[raw.type]
            // ERROR
        });
    }

    static fromObject(object: ConstructorParameters<typeof this>[0]) {
        return new this(object);
    }

    constructor (object: {
        name: string;
        count: number;
        type: T;
    }) {
        this.name = object.name;
        this.count = object.count;
        this.type = object.type;
    }
}
