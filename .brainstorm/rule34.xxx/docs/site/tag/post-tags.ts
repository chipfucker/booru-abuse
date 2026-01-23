import { PostTag } from "./type"
import { TagType } from "./enum"

/**
 * Tags retrieved from a post.
 */
export declare class PostTags extends Array<PostTag> {
    category<T extends TagType>(category: T): PostTag<T>[]
    text(): string
}
