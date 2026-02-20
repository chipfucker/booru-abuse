import { user as getURL } from "../../util/functions/site-url.ts";
docs:%20edit%20baseuser%20desc
/** The base interface for users. */
export abstract class BaseUser {
    /** The username of the user. */
    name: string;
    /** The unique id of the user. */
    id: number;

    /** Returns a URL to this user's profile on rule34.xxx. */
    toURL(): string { return getURL(this.name); }
}
