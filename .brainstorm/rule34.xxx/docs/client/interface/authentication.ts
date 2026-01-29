import {
    Id
} from "root"

/** An interface used for authenticating Rule34 API requests. */
export declare interface Authentication {
    /** The `user_id` parameter of the API key. */
    user_id: Id
    /** The `api_key` parameter of the API key. */
    api_key: string
}
