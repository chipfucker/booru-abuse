import { BaseTag } from "../_interface/base-tag";
import { TagType } from "../_enum/tag-type";
import { getWikiURL, getSearchURL } from "../../url/_function/tag";

/** Tags received from autocompletion. */
export class PostTag<T extends TagType = TagType> implements Omit<BaseTag<T>, "id"|"ambiguous"> {
    name: string;
    type: T;
    count: number;

    constructor (options: ConstructorOptions) {
        this.name = options.tag;
        this.type = <T> (() => { switch (options.type) {
            case "copyright": return TagType.Copyright;
            case "character": return TagType.Character;
            case "artist":    return TagType.Artist;
            case "tag":       return TagType.General;
            case "metadata":  return TagType.Metadata;
            case null:        return TagType.Ambiguous;
        }})();
        this.count = options.count;
    }

    toWikiURL = () => getWikiURL(this.name);
    toSearchURL = () => getSearchURL(this.name);
}

interface ConstructorOptions {
    tag: string;
    type: string;
    count: number;
}
