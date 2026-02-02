import type { BaseUser } from "../../misc/interfaces/base-user.ts";

/** A user tied to a client. */
export class ClientUser implements Omit<BaseUser, "name"|"toURL"> {
    id: number;

    static fromAuth(object: { user_id: number; }) {
        return new ClientUser({
            id: object.user_id
        });
    }

    constructor (options: { id: number; }) {
        this.id = options.id;
    }
}
