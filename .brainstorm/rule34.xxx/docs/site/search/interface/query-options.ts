import {
    TagParameter,
    SearchParameter
} from "../../../export"

// TODO: what all do searches support?
/**
 * An object to better visualize and modify advanced tag searches.  
 * This does not provide extra functionality over simply using a string. It is only
 * purposed to make searches more legible.
 */
export declare interface QueryOptions {
    include?: SearchParameter[]
    exclude?: SearchParameter[]
    fuzzy?: TagParameter[]
    or?: TagParameter[]
}