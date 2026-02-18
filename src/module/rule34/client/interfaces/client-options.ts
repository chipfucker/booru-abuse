import type { Authentication } from "./authentication.ts";

/** Options in use when creating a client. */
export interface ClientOptions {
    /** Authentication for API access. */
    auth: Authentication;
}
