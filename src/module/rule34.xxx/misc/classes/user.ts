import { user as getURL } from "../../util/functions/site-url.ts";
import type { BaseUser } from "../interfaces/base-user.ts";

/** A user on Rule34. */
export class User implements BaseUser {
    name: string;
    id: number;

    static fromObject(object: { name: string; id: number; }): User {
        return new User(object);
    }

    constructor (options: ConstructorOptions) {
        this.name = options.name;
        this.id = options.id;
    }

    toURL = () => getURL(this.name);
}

interface ConstructorOptions {
    name: string;
    id: number;
}