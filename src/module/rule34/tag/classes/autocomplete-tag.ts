import type { BaseTag } from "../interfaces/base-tag.ts";
import type { RawAutocompleteTag } from "../../api/raw/interface/raw-autocomplete-tag.ts";

/** A tag received from an autocomplete suggestion. */
export class AutocompleteTag implements Pick<BaseTag, "name" | "count"> {
    name;
    count;
    
    static RAW_INVALID_REGEX = <const> /\\r\\n/;
    static RAW_LABEL_COUNT_REGEX = <const> /(?<=\()\d+(?=\)$)/;

    static fromRaw(raw: RawAutocompleteTag): typeof this {
        return new this({
            name: raw.value,
            count: parseInt(
                raw.label.match(this.RAW_COUNT_REGEX)?.[0];
            )
        });
    }
    
    protected raw: RawAutocompleteTag;

    constructor (
        options: { name: string; count: number; },
        raw: RawAutocompleteTag
    ) {
        this.name = options.name;
        this.count = options.count;
        this.raw = raw;
    }

    isReal(): boolean {
        return !AutocompleteTag.RAW_INVALID_REGEX.test(this.raw.value);
    }
}
