// TODO: better word for 'maturity?'
/** The possible 'maturity' ratings of a post. */
export declare enum PostRating {
    /**
     * No explicit material.
     * @deprecated
     * This is no longer in use on Rule34, and the only posts you may find with this rating are very recent or already deleted.  
     * Consider using {@linkcode PostRating.Questionable Questionable} to get safer posts instead.
     */
    Safe,
    /** Safe or suggestive material. */
    Questionable,
    /** Explicit material. */
    Explicit
}

// TODO: better word for 'display status?'
/** The possible display statuses of a post. */
export declare enum PostStatus {
    /** Unmarked. */
    Active,
    /** Reported and yet to be reviewed. */
    Flagged,
    /** Not visible. */
    Deleted
}
