/** The possible display statuses of a post. */
export enum PostStatus {
    /** Unmarked. */
    Active,
    /** Reported and yet to be reviewed. */
    Flagged,
    /** Hidden when viewed on the site, and soon to be inaccessible. */
    Deleted
}
