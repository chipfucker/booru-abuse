namespace Rule34 {
    /** The base interface for query value interfaces. */
    export declare interface BaseQueryValueOptions {
        key: QueryValueKey
        comparison?: QueryValueComparison
        value: string | number
    }

    /** An interface for specific value queries. */
    export declare interface QueryValueOptions extends BaseQueryValueOptions {
        comparison?: QueryValueComparison.EqualTo,
    }

    /** An interface for value comparison queries. */
    export declare interface QueryValueComparisonOptions extends BaseQueryValueOptions {
        key:
            | QueryValueKey.Width
            | QueryValueKey.Height
            | QueryValueKey.Id
            | QueryValueKey.Score
        comparison: QueryValueComparison
    }

    // TODO: what all do searches support?
    /**
     * An object to better visualize and modify advanced tag searches.  
     * This does not provide extra functionality over simply using a string. It is only purposed to make searches more legible.
     */
    export declare interface QueryOptions {
        include?: SearchParameter[]
        exclude?: SearchParameter[]
        fuzzy?: TagParameter[]
        or?: TagParameter[]
    }

    /**
     * The base interface used for search objects.
     */
    export declare interface BaseSearchOptions {
        /** How many results to return. */
        perPage?: number
        /** The offset to use when getting results multiplied by `perPage`. */
        page?: number
        /** The offset to use when getting results. */
        offset?: number // TODO: is this available?
    }

    /**
     * The additional properties used for searching regular posts.
     */
    export declare interface ActiveSearchOptions extends BaseSearchOptions {
        /** The search query to use. */
        query?: SearchQuery
        /**
         * Whether to show deleted posts.
         * @deprecated
         * It is uncertain how exactly this is used.  
         * My attempts to fetch from any URL with the `deleted=show` parameter have refused to yield anything.
         */
        deleted?: boolean
    }

    /**
     * The additional properties used for searching deleted posts.
     */
    export declare interface DeletedSearchOptions extends BaseSearchOptions {
        /**
         * Whether to show deleted posts.
         * @deprecated
         * It is uncertain how exactly this is used.  
         * My attempts to fetch from any URL with the `deleted=show` parameter have refused to yield anything.
         */
        deleted: true
        /** @deprecated It is uncertain how exactly this affects deleted post searches. */
        lastId?: Id
    }

    /** Options used when searching for posts. */
    export declare type SearchOptions = ActiveSearchOptions | DeletedSearchOptions

    /** Tag used when searching for posts. */
    export declare type TagParameter = string | Pick<BaseTag, "name">

    /** Value query used when searching for posts. */
    export declare type ValueParameter = string | QueryValueOptions | QueryValueComparisonOptions

    /** A search parameter used when searching for posts. */
    export declare type SearchParameter = TagParameter | ValueParameter

    /** Query used when searching for posts. */
    export declare type SearchQuery = string | SearchParameter[]

    /** The possible properties to query post values. */
    export declare enum QueryValueKey {
        Hash = "md5",
        User = "user",
        Rating = "rating",
        Width = "width",
        Height = "height",
        Id = "id",
        Parent = "parent",
        Score = "score"
    }

    /** The possible comparisons to query post values. */
    export declare enum QueryValueComparison {
        EqualTo = "=",
        GreaterThan = ">",
        GreaterThanOrEqualTo = ">=",
        LessThan = "<",
        LessThanOrEqualTo = "<=",
    }
}
