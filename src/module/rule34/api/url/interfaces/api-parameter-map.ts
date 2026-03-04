import type { Authentication } from "../../../client/interfaces/authentication.ts";

export interface APIURLParameterMap {
    "autocomplete": {
        params: { q: string; };
        args: [];
    };
    "post": {
        params: Authentication & {
            tags?: string;
            id?: number;
            limit?: number;
            pid?: number;
        } & (
            | { json?: 0; }
            | { json: 1; fields?: "tag_info"; }
        );
        args: [ bothFormats?: boolean ];
    };
}
