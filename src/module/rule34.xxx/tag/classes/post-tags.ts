import { PostTag } from "./post-tag.ts";
import { TagType } from "../enums/tag-type.ts";

/** Array of tags found under a post. */
export class PostTags extends Array<PostTag> {
    private string: string;

    static fromRaw(raw: { string: string; tags: { tag: string; count: number; type: string; }[]; }): PostTags {
        const tags = raw.tags.map(tag => PostTag.fromRaw(tag));
        return new PostTags({ string: raw.string, tags: tags });
    }

    constructor (options: { string: string; tags: PostTag[]; }) {
        super(...options.tags);
        this.string = options.string;
    }

    /**
     * Returns tags filtered by their category.  
     * Equivalent to using `Array.filter` with a check for each item's type.
     */
    category<T extends TagType>(category: T): PostTag<T>[] {
        return <PostTag<T>[]> Array.from(this).filter(tag => tag.type === category);
    }
    override toString(): string { return this.string; }
}
