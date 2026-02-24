import { BaseUser } from "../../misc/interfaces/base-user.ts";

/** The creator of a post. */
export class PostAuthor extends BaseUser {
    bot: boolean;

    static fromObject(object: ConstructorParameters<typeof this>[0]) {
        return new this(object);
    }

    constructor (object: { name: string; id: number; }) {
        this.name = object.name;
        this.id = object.id;
        this.bot = this.name === "bot";
    }
}
