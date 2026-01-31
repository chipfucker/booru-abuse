import {
    BaseTag,
    TagType
} from "$root"

/** Partial tag retrieved from a post. */
export declare type PostTag<T extends TagType = TagType>
    = Pick<BaseTag<T>, "name"|"count"|"type"|"getSearchURL"|"getWikiURL">
