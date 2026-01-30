import { ClientOptions } from "../_interface/client-options";
import { ClientUser } from "./client-user";
import { AutocompleteTag } from "../../site/tag/_class/autocomplete-tag";
import { Id } from "../../../../util/_type/id";
/** A client to retrieve Rule34 data. */
export class Client {
    #user_id: Id;
    #api_key: string;
    
    /** Info regarding the user tied to the client. */
    self: ClientUser;

    constructor (options: ClientOptions) {
        options.auth.user_id = parseInt(options.auth.user_id as string);
        this.#api_key = options.auth.api_key;
        this.#user_id = options.auth.user_id;

        this.self = new ClientUser({
            id: options.auth.user_id
        });
    }
    
    /**
     * Returns autocomplete suggestions for a given search.
     * @param query Search to get autocomplete suggestions for.
     */
    async autocomplete(query: string): Promise<AutocompleteTag[]> {
        // TODO
        return [];
    }
}
