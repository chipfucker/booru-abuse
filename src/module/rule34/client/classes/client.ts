import { ClientUser } from "./client-user.ts";
import { AUTHENTICATION_RESPONSE } from "../constants/authentication-response.ts";
import { BooruAbuseError } from "../../../../error/classes/booru-abuse-error.ts";
import { AutocompleteTags } from "../../tag/classes/autocomplete-tags.ts";
import type { Authentication } from "../interfaces/authentication.ts";
import type { ClientOptions } from "../interfaces/client-options.ts";
import * as APIURL from "../../api/url/functions/api-url.ts";

/** Client to retrieve data from Rule 34 at rule34.xxx. */
export class Client {
    #auth: Authentication;
    private authorized: boolean = false;

    /** The user tied to the client. */
    self: ClientUser;

    constructor (options: ClientOptions) {
        this.#auth = options.auth;
        this.self = ClientUser.fromAuth(options.auth);
    }

    /**
     * Returns the client if the credentials are valid, otherwise throws an
     * error.
     */
    async test(): Promise<this | never> {
        if (!this.authorized) {
            const response = await fetch(APIURL.post(this.#auth, {
                limit: 0,
                json: 1
            })).then(r => r.text());

            switch (response) {
                case AUTHENTICATION_RESPONSE.MISSING_AUTHENTICATION:
                    BooruAbuseError.throw("INVALID_AUTH");
                case AUTHENTICATION_RESPONSE.EMPTY_ARRAY:
                    this.authorized = true;
                    break;
                default:
                    BooruAbuseError.throw(
                        "RULE34_UNEXPECTED_AUTH_RESPONSE", [ response ]
                    );
            }
        }

        return this;
    }

    /**
     * Returns autocomplete suggestions for a given search.
     * @param query Full search, the last tag of which to get results from.
     */
    async autocomplete(query: string): Promise<AutocompleteTags> {
        return await AutocompleteTags.fromQuery(query);
    }
}
