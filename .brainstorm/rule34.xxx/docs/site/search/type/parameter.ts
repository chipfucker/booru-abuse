import { QueryValueOptions,
         QueryValueComparisonOptions } from "../interface/query-value-options"
import { BaseTag                     } from "../../tag/interface/base-tag"

/** Tag used when searching for posts. */
export declare type TagParameter = string | Pick<BaseTag, "name">

/** Value query used when searching for posts. */
export declare type ValueParameter = string | QueryValueOptions | QueryValueComparisonOptions

/** A search parameter used when searching for posts. */
export declare type SearchParameter = TagParameter | ValueParameter
