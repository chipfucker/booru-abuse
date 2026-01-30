import { IdParameter } from "../../../../util/_type/id-parameter";

/** An interface used for authenticating Rule34 API requests. */
export interface Authentication {
    /** The `user_id` parameter of the API key. */
    user_id: IdParameter;
    /** The `api_key` parameter of the API key. */
    api_key: string;
}
