import type { Authentication } from "./authentication.ts";

/** Options for the Client constructor. */
export interface ClientOptions {
    /** Authorization for API access. */
    auth: Authentication;
}
