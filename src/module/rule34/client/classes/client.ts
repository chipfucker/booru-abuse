import { ClientUser } from "./client-user.ts";
import { MISSING_AUTHENTICATION } from "../constants/missing-authentication.ts";
import { Authentication } from "../interfaces/authentication.ts";
import type { ClientOptions } from "../interfaces/client-options.ts";
import * as api from "../../util/functions/api-url.ts";

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
            const response = await fetch(api.post(this.#auth, {
                limit: 0,
                json: 1
            })).then(r => r.text());

            if (response === MISSING_AUTHENTICATION)
                throw Error([
                    "Invalid authentication! Make sure you've provided the",
                    "necessary credentials."
                ].join(" "));
            else if (response === "[]")
                this.authorized = true;
            else
                throw Error([
                    "Unexpected response! Please report this error and the",
                    "following response:\n" + response
                ].join(" "));
        }

        return this;
    }
}
