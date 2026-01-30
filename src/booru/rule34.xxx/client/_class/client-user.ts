import { BaseUser } from "../../site/_interface/base-user";
import { getURL } from "../../site/url/_function/user";

/** A user tied to a client. */
export class ClientUser implements Omit<BaseUser, "name"> {
    id: number;

    constructor (options: ConstructorOptions) {
        this.id = options.id;
    }

    toURL = () => getURL(this.id);
}

interface ConstructorOptions {
    id: number;
}
