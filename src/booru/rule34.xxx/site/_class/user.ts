import { BaseUser } from "../_interface/base-user.ts";
import { getURL } from "../url/get-url/_function/user.ts";

/** A user on Rule34. */
export class User implements BaseUser {
    name: string;
    id: number;

    constructor (options: ConstructorOptions) {
        this.name = options.name;
        this.id = options.id;
    }

    toURL = () => getURL(this.id);
}

interface ConstructorOptions {
    name: string;
    id: number;
}
