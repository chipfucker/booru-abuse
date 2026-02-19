import { ERROR_CODE } from "../constants/error-code.ts";

export class BooruAbuseError extends Error {
    /** The unique error code. */
    code: string;
    /** The hint explaining the error. */
    hint?: string;

    constructor (code: keyof typeof ERROR_CODE, ...args: any[]) {
        const errorCode = ERROR_CODE[code](...args);
        super();
        
        this.name = this.constructor.name;
        this.code = code;
        
        this.message = errorCode.message;
        this.hint = errorCode.hint;
    }
}
