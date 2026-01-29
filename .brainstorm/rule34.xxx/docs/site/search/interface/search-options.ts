import {
    SearchQuery,
    Id
} from "root"

/** The base interface used for search objects. */
export declare interface BaseSearchOptions {
    /** How many results to return. */
    perPage?: number
    /** The offset to use when getting results multiplied by `perPage`. */
    page?: number
    /** The offset to use when getting results. */
    offset?: number // TODO: is this available?
}

/** The additional properties used for searching regular posts. */
export declare interface ActiveSearchOptions extends BaseSearchOptions {
    /** The search query to use. */
    query?: SearchQuery
    /**
     * Whether to show deleted posts.
     * @deprecated
     * It is uncertain how exactly this is used.  
     * My attempts to fetch from any URL with the `deleted=show` parameter have refused
     * to yield anything.
     */
    deleted?: boolean
}

/** The additional properties used for searching deleted posts. */
export declare interface DeletedSearchOptions extends BaseSearchOptions {
    /**
     * Whether to show deleted posts.
     * @deprecated
     * It is uncertain how exactly this is used.  
     * My attempts to fetch from any URL with the `deleted=show` parameter have refused
     * to yield anything.
     */
    deleted: true
    /** @deprecated It is uncertain how exactly this affects deleted post searches. */
    lastId?: Id
}
