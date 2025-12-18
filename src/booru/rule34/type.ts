//#region interface

export interface Auth {
    user_id: ID
    pass_hash: string
    api_key: string
}

// TODO
export interface SearchQuery {
    include?: SearchParameter
    exclude?: SearchParameter
    fuzzy?: SearchParameter
    or: SearchParameter | SearchParameter[] | SearchQuery[]
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

//#endregion
