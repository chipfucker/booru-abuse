import { BaseTag } from "./interface"
import { TagType } from "./enum"

/** Full tag, usually retrieved from getting a tag directly. */
export declare type Tag = BaseTag

/** Partial tag retrieved from a post. */
export declare type PostTag<T extends TagType = TagType> = Pick<BaseTag<T>, "name" | "count" | "type">
