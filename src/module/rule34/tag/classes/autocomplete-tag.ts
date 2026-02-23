import type { BaseTag } from "../interfaces/base-tag.ts";
import type { RawAutocompleteTags } from "../../api/raw/interface/raw-autocomplete-tag.ts";

/** A tag received from an autocomplete suggestion. */
export class AutocompleteTag implements Pick<BaseTag, "name" | "count"> {
    name: string;
    count: number;
    
    static RAW_INVALID_REGEX = /\\r\\n/;
    static RAW_LABEL_COUNT_REGEX = /(?<=\()\d+(?=\)$)/;

    static fromRaw(raw: RawAutocompleteTags[number]): AutocompleteTag {
        return new this({
            name: raw.value,
            count: parseInt(
                raw.label.match(this.RAW_LABEL_COUNT_REGEX)?.[0] ?? "0"
            )
        }, raw);
    }
    
    protected raw: RawAutocompleteTags[number];

    constructor (
        options: { name: string; count: number; },
        raw: RawAutocompleteTags[number]
    ) {
        this.name = options.name;
        this.count = options.count;
        this.raw = raw;
    }

    isReal(): boolean {
        return !AutocompleteTag.RAW_INVALID_REGEX.test(this.raw.value);
    }
}
