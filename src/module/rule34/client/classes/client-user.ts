import type { BaseUser } from "../../misc/interfaces/base-user.ts";
import type { Authentication } from "../interfaces/authentication.ts";

/** A user tied to a client. */
export class ClientUser implements Pick<BaseUser, "id"> {
    id: number;

    static fromAuth(auth: Pick<Authentication, "user_id">) {
        return new ClientUser({
            id: auth.user_id
        });
    }

    constructor (options: { id: number; }) {
        this.id = options.id;
    }
}
