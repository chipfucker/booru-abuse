//#region interface

export interface Auth {
    user_id: ID
    pass_hash: string
    api_key: string
}

// TODO
export interface SearchQueryObject {
    include?: SearchParam
    exclude?: SearchParam
    fuzzy?: SearchParam
    or?: SearchParam[]
}

export interface SearchOptions {
    query?: SearchQuery
    perPage?: number
    page?: number
    offset?: number // TODO
    deleted?: boolean
    earliestDeletedId?: ID
}

//#endregion

//#region type

export type ID = number | `${number}`

export type UserAuth = Pick<Auth, "pass_hash" | "user_id">

export type ApiAuth = Pick<Auth, "api_key" | "user_id">

export type ValueQuery = {
    key: SearchValueName,
    comparison?: SearchValueComparison,
    value: string | ID
} | `${string}:${"" | "<" | ">"}${string}`

export type TagQuery = string | PostTag | ValueQuery

export type SearchParam = string | TagQuery | TagQuery[]

export type SearchQuery = SearchParam | SearchQueryObject

//#endregion

//#region enum

export enum SearchValueName {

}

export enum SearchValueComparison {
    EqualTo,
    LessThan,
    GreaterThan
}

export enum PostRating {
    Safe,
    Questionable,
    Explicit
}

export enum PostStatus {
    Active,
    Flagged,
    Deleted
}

export enum PostTagType {
    Copyright,
    Character,
    Artist,
    General,
    Metadata,
    Ambiguous
}

//#endregion
