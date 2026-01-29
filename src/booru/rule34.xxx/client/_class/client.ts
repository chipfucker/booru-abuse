import { ClientOptions   } from "../_interface/client-options.ts";
import { User            } from "../../site/_interface/user.ts";
import { AutocompleteTag } from "../../site/tag/_class/autocomplete-tag.ts";
import { Id              } from "../../../../util/_type/id.ts";
/** A client to retrieve Rule34 data. */
export class Client {
    #user_id: Id;
    #api_key: string;
    
    /** Info regarding the user tied to the client. */
    self: User;

    constructor (options: ClientOptions) {
        this.#api_key = options.auth.api_key;
        this.#user_id = options.auth.user_id;

        this.self = new User({
            name: "",
            id: options.auth.user_id
        });
    }
    
    /**
     * Returns autocomplete suggestions for a given search.
     * @param query Search to get autocomplete suggestions for.
     */
    async autocomplete(query: string): Promise<AutocompleteTag[]> {
        
    }
}
