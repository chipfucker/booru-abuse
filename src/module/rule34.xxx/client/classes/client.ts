import { ClientUser } from "./client-user.ts";
import { AutocompleteTags } from "../../tag/classes/autocomplete-tags.ts";
import type { Authentication } from "../interfaces/authentication.ts";
import type { ClientOptions } from "../interfaces/client-options.ts";

/** A client to retrieve date from rule34.xxx. */
export class Client {
    #auth: Authentication;
    
    /** Info regarding the user tied to the client. */
    self: ClientUser;

    constructor (options: ClientOptions) {
        this.#auth = options.auth;
        this.self = ClientUser.fromAuth(options.auth);
    }
    
    /**
     * Returns autocomplete suggestions for a given search.
     * @param query Search to get autocomplete suggestions for.
     */
    async autocomplete(query: string): Promise<AutocompleteTags> {
        return await AutocompleteTags.fromQuery(query);
    }
}
