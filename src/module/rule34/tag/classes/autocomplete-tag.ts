import type { BaseTag } from "../interfaces/base-tag.ts";
import type { RawAutocompleteTags } from "../../api/raw/interface/raw-autocomplete-tag.ts";

/** A tag received from an autocomplete suggestion. */
export class AutocompleteTag implements Pick<BaseTag, "name" | "count"> {
    name: string;
    count: number;
    
    static RAW_INVALID_REGEX = /\\r\\n/;
    static RAW_LABEL_COUNT_REGEX = /(?<=\()\d+(?=\)$)/;

    protected raw: RawAutocompleteTags[number];
    
    static fromRaw(raw: RawAutocompleteTags[number]): AutocompleteTag {
        return this.fromObject({
            name: raw.value,
            count: parseInt(
                raw.label.match(this.RAW_LABEL_COUNT_REGEX)?.[0] ?? "0"
            )
        }, raw);
    }

    static fromObject(object: ConstructorParameters<typeof this>[0]) {
        return new this(object);
    }
    
    protected constructor (
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
