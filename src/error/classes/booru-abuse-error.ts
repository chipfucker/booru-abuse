import { ERROR_CODE, type ErrorCode, type ErrorCodeParameters } from "../constants/error-code.ts";

export class BooruAbuseError extends Error {
    /** The unique error code. */
    code: ErrorCode;
    /** The hint explaining the error. */
    hint: string | undefined;

    constructor (code: ErrorCode, args: ErrorCodeParameters<typeof code>) {
                                           // @ts-expect-error TS2556
        const errorCode = ERROR_CODE[code](...args);
        super();
        
        this.name = this.constructor.name;
        this.code = code;
        
        this.message = errorCode.message;
        this.hint = errorCode.hint;
    }
}
