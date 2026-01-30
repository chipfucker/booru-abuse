import { BaseTag } from "../_interface/base-tag";
import { TagType } from "../_enum/tag-type";
import { getWikiURL, getSearchURL } from "../../url/_function/tag";

/** Tags received from autocompletion. */
export class PostTag<T extends TagType = TagType> implements Omit<BaseTag<T>, "id"|"ambiguous"> {
    name: string;
    type: T;
    count: number;

    constructor (options: ConstructorOptions<T>) {
        this.name = options.name;
        this.type = options.type;
        this.count = options.count;
    }

    toWikiURL = () => getWikiURL(this.name);
    toSearchURL = () => getSearchURL(this.name);
}

interface ConstructorOptions<T> {
    name: string;
    type: T;
    count: number;
}
