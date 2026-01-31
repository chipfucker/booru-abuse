import { PostTag } from "./post-tag";
import { TagType } from "../_enum/tag-type";

export class PostTags extends Array<PostTag> {
    #string: string;
    constructor (options: ConstructorOptions) {
        super(...options.tags);
        this.#string = options.string;
    }

    /**
     * Returns tags filtered by their category.  
     * Equivalent to using `Array.filter` with a check for each item's type.
     */
    category<T extends TagType>(category: T): PostTag<T>[] {
        return this.filter(tag => tag.type === category) as PostTag<T>[];
    }
    toString(): string { return this.#string; }
}

interface ConstructorOptions {
    string: string;
    tags: PostTag[];
}
