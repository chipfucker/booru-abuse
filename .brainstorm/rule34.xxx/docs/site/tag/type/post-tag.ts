import { TagType } from "../enum/tag-type"
import { BaseTag } from "../interface/base-tag"

/** Partial tag retrieved from a post. */
export declare type PostTag<T extends TagType = TagType> = Pick<BaseTag<T>, "name" | "count" | "type">
