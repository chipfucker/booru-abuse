import { BaseTag } from "../_interface/base-tag.ts";
import { getSearchURL } from "../../url/get-url/_function/tag.ts";

/** Tags received from autocompletion. */
export class AutocompleteTag implements Omit<BaseTag, "id"|"type"|"ambiguous"|"toWikiURL"> {
    name: string;
    count: number;

    constructor (options: ConstructorOptions) {
        this.name = options.name;
        this.count = options.count;
    }

    toSearchURL = () => getSearchURL(this.name);
}

interface ConstructorOptions {
    name: string;
    count: number;
}
