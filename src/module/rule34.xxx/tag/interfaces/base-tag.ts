import { TagType } from "../enums/tag-type.ts";

/** The base interface for Rule34 tags. */
export interface BaseTag<T extends TagType = TagType> {
    /** The name and value of the tag. */
    name: string;
    /** The unique Id of the tag. */
    id: number;
    /** The amount of posts that use this tag. */
    count: number;
    /** The type of this tag. */
    type: T;
    /** It is uncertain what this property labels. */
    ambiguous: boolean;

    /** Returns a URL to this tag's wiki page on rule34.xxx. */
    toWikiURL(): string;
    /** Returns a URL to a search with this tag on rule34.xxx. */
    toSearchURL(): string;
}
