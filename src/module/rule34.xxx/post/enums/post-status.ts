// TODO: better word for 'display status?'
/** The possible display statuses of a post. */
export enum PostStatus {
    /** Unmarked. */
    Active,
    /** Reported and yet to be reviewed. */
    Flagged,
    /** Not visible on the front page, and soon to be inaccessible with the API. */
    Deleted
}
