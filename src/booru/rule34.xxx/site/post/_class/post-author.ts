import { User } from "../../../site/_class/user.ts";

export class PostAuthor extends User {
    /**
     * Whether the post was uploaded by a bot.  
     * Useful in place of checking whether the username is "bot"; equivalent to:
     * 
     * ```javascript
     * this.name == "bot"
     * ```
     */
    bot: boolean;

    constructor (options: ConstructorParameters<typeof User>[0]) {
        super(options);
        this.bot = this.name === "bot";
    }
}
