import { ERROR_CODE, type ErrorCode } from "../constants/error-code.ts";

export class BooruAbuseError extends Error {
    /** The unique error code. */
    code: ErrorCode;
    /** The hint explaining the error. */
    hint: string | undefined;

    constructor (code: ErrorCode, ...args: any[]) {
        const errorCode = ERROR_CODE[code]!(...args);
        super();
        
        this.name = this.constructor.name;
        this.code = code;
        
        this.message = errorCode.message;
        this.hint = errorCode.hint;
    }
}
