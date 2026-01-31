/** The possible types a tag can have. */
export enum TagType {
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
