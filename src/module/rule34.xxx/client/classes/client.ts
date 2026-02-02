import type { ClientOptions } from "../interfaces/client-options.ts";

/** A client to retrieve date from rule34.xxx. */
export class Client {
    #auth: {
        api_key: string;
        user_id: number;
    };

    constructor (options: ClientOptions) {
        this.#auth = options.auth;
    } 
}
