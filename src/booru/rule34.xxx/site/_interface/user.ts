/** A user on Rule34. */
export class User {
    /** The username of the user. */
    name: string;
    /** The unique Id of the user. */
    id: number;

    constructor (options: ConstructorOptions) {
        this.name = options.name;
        this.id = options.id;
    }

    /** Returns a URL to this user's profile on rule34.xxx. */
    getURL(): string {
        return "https://rule34.xxx/"; // TODO
    }
}

interface ConstructorOptions {
    name: string,
    id: number
}
