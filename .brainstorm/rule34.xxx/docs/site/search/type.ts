import { BaseTag } from "../tag/interface"
import { QueryValueOptions, QueryValueComparisonOptions } from "./interface"
import { ActiveSearchOptions, DeletedSearchOptions } from "./interface"

/** Tag used when searching for posts. */
export declare type TagParameter = string | Pick<BaseTag, "name">

/** Value query used when searching for posts. */
export declare type ValueParameter = string | QueryValueOptions | QueryValueComparisonOptions

/** A search parameter used when searching for posts. */
export declare type SearchParameter = TagParameter | ValueParameter

/** Query used when searching for posts. */
export declare type SearchQuery = string | SearchParameter[]

/** Options used when searching for posts. */
export declare type SearchOptions = ActiveSearchOptions | DeletedSearchOptions
