import { BaseUser } from "../../site/_interface/base-user.ts";
import { getURL } from "../../site/url/get-url/_function/user.ts";

/** A user tied to a client. */
export class ClientUser implements Omit<BaseUser, "name"|"toURL"> {
    id: number;

    constructor (options: ConstructorOptions) {
        this.id = options.id;
    }
}

interface ConstructorOptions {
    id: number;
}
