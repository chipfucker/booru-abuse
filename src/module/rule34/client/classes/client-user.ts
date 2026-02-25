import type { BaseUser } from "../../misc/interfaces/base-user.ts";
import type { Authentication } from "../interfaces/authentication.ts";

/** A user tied to a client. */
export class ClientUser implements Pick<BaseUser, "id"> {
    id: number;

    static fromAuth(auth: Pick<Authentication, "user_id">) {
        return this.fromObject({
            id: auth.user_id
        });
    }

    static fromObject(object: ConstructorParameters<typeof this>[0]) {
        return new this(object);
    }

    protected constructor (options: { id: number; }) {
        this.id = options.id;
    }
}
