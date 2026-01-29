import { PostTag } from "../type/post-tag"
import { TagType } from "../enum/tag-type"

/** Tags retrieved from a post. */
export declare class PostTags extends Array<PostTag> {
    /**
     * Returns tags filtered by their category.  
     * Equivalent to using `Array.filter` with a check for each item's type.
     */
    category<T extends TagType>(category: T): PostTag<T>[]
    toString(): string
}
