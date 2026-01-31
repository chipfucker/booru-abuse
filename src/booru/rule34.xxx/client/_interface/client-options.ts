import { Authentication } from "./authentication.ts";
import { ClientConfiguration } from "./client-configuration.ts";

export interface ClientOptions {
    /** Authorization for API access. */
    auth: Authentication;
    /** Client configuration object. */
    config?: ClientConfiguration;
}
