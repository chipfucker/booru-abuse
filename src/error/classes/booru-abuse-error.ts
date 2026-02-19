export class BooruAbuseError extends Error {
    /** The unique error code. */
    code: string;

    constructor (code, ...value) {
        super();

        this.name = this.constructor.name;
        this.code = code;
    }
}
