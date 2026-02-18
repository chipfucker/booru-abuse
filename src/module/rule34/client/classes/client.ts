import { Authentication } from "../interfaces/authentication.ts";
import { ClientUser } from "./client-user.ts";
import type { ClientOptions } from "../interfaces/client-options.ts";

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
}
