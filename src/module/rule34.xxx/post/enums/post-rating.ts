// TODO: better word for 'maturity?'
/** The possible 'maturity' ratings of a post. */
export enum PostRating {
    /**
     * No explicit material.
     * @deprecated
     * This is no longer in use on Rule34, and the only posts you may find with this
     * rating are very recent or already deleted.  
     * Consider using {@linkcode PostRating.Questionable Questionable} to get safer
     * posts instead.
     */
    Safe,
    /** Safe or suggestive material. */
    Questionable,
    /** Explicit material. */
    Explicit
}
