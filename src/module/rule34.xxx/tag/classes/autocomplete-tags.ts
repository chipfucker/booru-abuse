import { AutocompleteTag } from "./autocomplete-tag.ts";
import { fetchJSON } from "../../../../util/functions/fetch-json.ts";
import * as api from "../../util/functions/api-url.ts";
import type { RawAutocompleteTag } from "../interfaces/raw-autocomplete-tag.ts";

/** Array of tags received as autocomplete suggestions. */
export class AutocompleteTags extends Array<AutocompleteTag> {
    /** Full query used to get autocompletion suggestions. */
    query: string;
    /** Single incomplete tag used to get autocompletion suggestions. */
    incompleteTag: string | null;

    static async fromQuery(query: string): Promise<AutocompleteTags> {
        if (!query.match(lastRegex)) return AutocompleteTags.fromRaw([], query);
        const response: RawAutocompleteTag[] = await fetchJSON(api.autocomplete(query));
        return AutocompleteTags.fromRaw(response, query);
    }

    static fromRaw(object: RawAutocompleteTag[], query: string): AutocompleteTags {
        return new AutocompleteTags({ json: object, query });
    }

    constructor ({ json, query }: { json: RawAutocompleteTag[]; query: string }) {
        const tags: RawAutocompleteTag[] = [];
        for (const tag of json) {
            if (tag.value.match(/\\r\\n/)) break;
            else tags.push(tag);
        }
        super(...tags.map(tag => AutocompleteTag.fromRaw(tag)));

        this.query = query;
        this.incompleteTag = query.match(lastRegex)?.[0] ?? null;
    }
}

const lastRegex = /(?<= ?)[^ ]+$/;
