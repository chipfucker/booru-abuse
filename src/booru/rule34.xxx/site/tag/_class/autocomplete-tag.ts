import { BaseTag } from "./base-tag.ts";

/** Tags received from autocompletion. */
export class AutocompleteTag extends BaseTag {
    
}= Pick<BaseTag, "name"|"count"|"getWikiURL"|"getSearchURL">;
