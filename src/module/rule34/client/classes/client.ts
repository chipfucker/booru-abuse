import { ClientUser } from "./client-user.ts";
import { AUTHENTICATION_RESPONSE } from "../constants/authentication-response.ts";
import { apiUrl } from "../../api/url/functions/api-url.ts";
import { Posts } from "../../post/classes/posts.ts";
import { AutocompleteTags } from "../../tag/classes/autocomplete-tags.ts";
import { BooruAbuseError } from "../../../../error/classes/booru-abuse-error.ts";
import { awaitPromisesOfObject } from "../../../../util/json/functions/await-promises-of-object.ts";
import { fetchJson, fetchXml } from "../../../../util/rest.ts";
import type { Authentication } from "../interfaces/authentication.ts";
import type { ClientOptions } from "../interfaces/client-options.ts";
import type { ApiUrlParameterMap } from "../../api/url/interfaces/api-parameter-map.ts";

/** Client to retrieve data from Rule 34 at rule34.xxx. */
export class Client {
    #auth: Authentication;

    protected authorized: boolean = false;
    
    /** The user tied to the client. */
    self: ClientUser;

    apiUrl = <S extends keyof ApiUrlParameterMap>(
        s: S,
        params: Omit<ApiUrlParameterMap[S]["params"], keyof Authentication>,
        ...args: ApiUrlParameterMap[S]["args"]
    ) => apiUrl(s, { ...params, ...this.#auth }, ...args);
    
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
            const response = await fetch(apiUrl("post", {
                ...this.#auth,
                limit: 0,
                json: 1
            })).then(r => r.text());

            switch (response) {
                case AUTHENTICATION_RESPONSE.EMPTY_ARRAY:
                    this.authorized = true;
                    break;
                case AUTHENTICATION_RESPONSE.MISSING_AUTHENTICATION:
                    BooruAbuseError.throw("INVALID_AUTH");
                default:
                    BooruAbuseError.throw(
                        "RULE34_UNEXPECTED_AUTH_RESPONSE", [ response ]
                    );
            }
        }

        return this;
    }
    
    static AUTOCOMPLETE_LAST_TAG_REGEX = /(?<= ?)[^ ]+$/;

    /**
     * Returns autocomplete suggestions for a given tag.
     * @param tag The incomplete tag.
     */
    async autocomplete(tag: string): Promise<AutocompleteTags> {
        return await fetchJson(this.apiUrl(
            "autocomplete",
            { q: tag.match(Client.AUTOCOMPLETE_LAST_TAG_REGEX)![0] })
            // ERROR
        ).then(raw => AutocompleteTags.fromRaw(raw, tag));
    }

    /**
     * Returns posts resulting from a search query.
     * @param query The search query.
     * @param options The options to affect the returned results.
     */
    async search(
        query: string,
        options?: { perPage?: number; page?: number; }
    ): Promise<Posts> {
        const url = this.apiUrl("post", {
            tags: query,
            limit: options.perPage ?? 
        })
    }
}
