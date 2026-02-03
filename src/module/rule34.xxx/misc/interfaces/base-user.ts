/** The base interface for user types. */
export interface BaseUser {
    /** The username of the user. */
    name: string;
    /** The unique Id of the user. */
    id: number;

    /** Returns a URL to this user's profile on rule34.xxx. */
    toURL(): string;
}
