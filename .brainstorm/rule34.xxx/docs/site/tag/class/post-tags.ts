import { PostTag } from "../type/post-tag"
import { TagType } from "../enum/tag-type"

/**
 * Tags retrieved from a post.
 */
export declare class PostTags extends Array<PostTag> {
    category<T extends TagType>(category: T): PostTag<T>[]
    text(): string
}
