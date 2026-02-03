import type { BaseTag } from "../interfaces/base-tag.ts";
import type { RawAutocompleteTag } from "../interfaces/raw-autocomplete-tag.ts";

/** A tag received from an autocomplete suggestion. */
export class AutocompleteTag implements Pick<BaseTag, "name"|"count"> {
    name: string;
    count: number;

    static fromRaw(object: RawAutocompleteTag): AutocompleteTag {
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
