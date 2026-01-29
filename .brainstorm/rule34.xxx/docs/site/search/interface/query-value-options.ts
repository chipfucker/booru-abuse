import {
    QueryValueKey,
    QueryValueComparison
} from "root"

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
