namespace Rule34 {
    /**
     * Tags retrieved from a post.
     */
    export declare class PostTags extends Array<PostTag> {
        category<T extends TagType>(category: T): PostTag<T>[]
        text(): string
    }

    /**
     * The base interface for Rule34 tags.
     */
    export declare interface BaseTag<T extends TagType = TagType> {
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

    /** Full tag, usually retrieved from getting a tag directly. */
    export declare type Tag = BaseTag

    /** Partial tag retrieved from a post. */
    export declare type PostTag<T extends TagType = TagType> = Pick<BaseTag<T>, "name" | "count" | "type">

    /** The possible types a tag can have. */
    export declare enum TagType {
        /** A copyright, such as a series, brand, or franchise. */
        Copyright,
        /** A character, type of character, or a cover for a vague character description. */
        Character,
        /** An artist alias, or a tag asking for help finding and tagging with the correct artist, such as `artist_request`. */
        Artist,
        /** A visual, activity, interest, or a tag that otherwise wouldn't suit any other tag type. */
        General,
        /** Image metadata, such as dimensions, animation, or calls for help, such as `tagme`. */
        Metadata,
        /**
         * An errenous type, such as when a tag's type is labelled `null`.  
         * Typically displayed as if a {@linkcode TagType.General General} tag.
         */
        Ambiguous
    }
}