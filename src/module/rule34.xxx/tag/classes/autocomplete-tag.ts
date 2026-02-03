import type { BaseTag } from "../interfaces/base-tag.ts";

/** A tag received from an autocomplete suggestion. */
export class AutocompleteTag implements Pick<BaseTag, "name"|"count"> {
    name: string;
    count: number;

    static fromObject(object: { label: string; value: string; }): AutocompleteTag {
        return new AutocompleteTag({
            name: object.value,
            count: parseInt(object.label.match(/(?<=\()\d+(?=\)$)/)![0])
        });
    }

    constructor (options: { name: string; count: number; }) {
        this.name = options.name;
        this.count = options.count;
    }
}
