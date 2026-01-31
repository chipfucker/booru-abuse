import {
    TagType,
    Id
} from "$root"

/** The base interface for Rule34 tags. */
export interface BaseTag<T extends TagType = TagType> {
    /** The name and value of the tag. */
    name: string
    /** The unique Id of the tag. */
    id: Id
    /** The amount of posts that use this tag. */
    count: number
    /** The type of this tag. */
    type: T
    /** @warning It is uncertain what this property labels. */
    ambiguous: boolean

    /** Returns a URL to this tag's wiki page on rule34.xxx. */
    getWikiURL(): string
    /** Returns a URL to a search with this tag on rule34.xxx. */
    getSearchURL(): string
}
