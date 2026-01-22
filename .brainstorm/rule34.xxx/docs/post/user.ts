namespace Rule34 {
    /**
     * A user on Rule34.
     */
    export declare class User {
        /** The username of the user. */
        name: string
        /** The unique Id of the user. */
        id: number

        /** Returns a URL to this user's profile on rule34.xxx. */
        getURL(): string
    }
}