import type { BaseTag } from "../interfaces/base-tag.ts";

/** A tag received from an autocomplete suggestion. */
export class AutocompleteTag implements Omit<BaseTag, "id"|"type"|"ambiguous"|"toWikiURL"> {
    name: string;
    count: number;

    fromObject(object: { name: string; count: number; }) {
        return new AutocompleteTag(object);
    }

    constructor (options: { name: string; count: number; }) {
        this.name = options.name;
        this.count = options.count;
    }
}
