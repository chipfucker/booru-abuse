import {
    ERROR_CODE, ERROR_ISSUE_MESSAGE,
    type ErrorCode, type ErrorCodeParameters
} from "../constants/error-code.ts";

export class BooruAbuseError extends Error {
    /** The unique error code. */
    code: ErrorCode;
    /** The hint explaining the error. */
    hint: string | undefined;
    /** Whether the error should be reported. */
    issue: boolean;

    constructor (code: ErrorCode, args: ErrorCodeParameters<typeof code>) {
                                           // @ts-expect-error TS2556
        const errorCode = ERROR_CODE[code](...args);

        super(errorCode.message);
        this.name = this.constructor.name;
        this.code = code;
        this.hint = errorCode.hint;
        this.issue = errorCode.issue ?? false;
    }

    override toString(): string {
        return Error.prototype.toString.call({
            name: `${this.name}(${this.code})`,
            message: [
                this.message,
                this.hint,
                this.issue && ERROR_ISSUE_MESSAGE
            ].filter(i => !!i).join("\n")
        });
    }

    static throw(
        ...args: ConstructorParameters<typeof BooruAbuseError>
    ): never {
        throw new this(...args);
    }
}
