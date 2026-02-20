import type { Authentication } from "../../client/interfaces/authentication.ts";

export interface Autocomplete {
    q: string;
}

export type Search = {
    tags?: string;
    id?: number;
    limit?: number;
    pid?: number;
} & (
    | { json?: 0; }
    | { json: 1; fields?: "tag_info" | string; }
);
