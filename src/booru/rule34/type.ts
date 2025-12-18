//#region interface

export interface Auth {
    user_id: ID
    pass_hash: string
    api_key: string
}

// TODO
export interface SearchQueryObject {
    include?: SearchParameter
    exclude?: SearchParameter
    fuzzy?: SearchParameter
    value?: SearchQueryValue[]
    or?: SearchParameter[] | SearchQuery[]
}

export interface SearchQueryValue {
    name: SearchValueName
    comparison?: SearchValueComparison
    value: string | ID
}

export interface SearchOptions {
    query?: string | TagParameter | SearchQuery
}

//#endregion

//#region type

export type ID = number | `${number}`

export type UserAuth = Pick<Auth, "pass_hash" | "user_id">

export type TagParameter = string | Pick<PostTag, "name">

export type SearchParameter = string | TagParameter | TagParameter[]

export type SearchQuery = SearchParameter | SearchQueryObject

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
