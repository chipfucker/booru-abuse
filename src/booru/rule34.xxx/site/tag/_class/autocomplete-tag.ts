import { BaseTag } from "../_interface/base-tag.ts";
import { getWikiURL, getSearchURL } from "../../url/_function/tag.ts";

/** Tags received from autocompletion. */
export class AutocompleteTag implements Omit<BaseTag, "id"|"type"|"ambiguous"> {
    name: string;
    count: number;

    constructor (options: ConstructorOptions) {
        this.name = options.name;
        this.count = options.count;
    }

    // TODO
    toWikiURL = () => getWikiURL(this.name);
    toSearchURL = () => getSearchURL(this.name);
}

interface ConstructorOptions {
    name: string;
    count: number;
}
