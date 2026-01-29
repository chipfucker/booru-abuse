import {
    Authentication
} from "./authentication";

export interface ClientOptions {
    /** Authorization for API access. */
    auth: Authentication
    /** Client configuration object. */
    config?: {}
}
