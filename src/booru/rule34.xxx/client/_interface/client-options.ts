import { Authentication } from "./authentication";
import { ClientConfiguration } from "./client-configuration";

export interface ClientOptions {
    /** Authorization for API access. */
    auth: Authentication;
    /** Client configuration object. */
    config?: ClientConfiguration;
}
