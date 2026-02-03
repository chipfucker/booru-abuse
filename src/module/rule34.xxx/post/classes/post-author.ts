import { User } from "../../misc/classes/user.ts";

/** The creator of a post. */
export class PostAuthor extends User {
    /**
     * Whether the post was uploaded by a bot.  
     * Equivalent to whether the name is equal to "bot".
     */
    bot: boolean;
    
    static override fromObject(object: Parameters<typeof User["fromObject"]>[0]): PostAuthor {
        return new PostAuthor(object);
    }

    constructor (options: ConstructorParameters<typeof User>[0]) {
        super(options);
        this.bot = this.name === "bot";
    }
}
