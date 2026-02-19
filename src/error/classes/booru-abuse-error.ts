import { ERROR_CODE, type ErrorCode, type ErrorCodeParameters } from "../constants/error-code.ts";

export class BooruAbuseError extends Error {
    /** The unique error code. */
    code: ErrorCode;
    /** The hint explaining the error. */
    hint: string | undefined;

    constructor (code: ErrorCode, args: ErrorCodeParameters<typeof code>) {
                                           // @ts-expect-error TS2556
        const errorCode = ERROR_CODE[code](...args);

        super(errorCode.message);
        this.name = this.constructor.name;
        this.code = code;
        this.hint = errorCode.hint;
    }

    override toString(): string {
        return Error.prototype.toString.call({
            name: `${this.name}(${this.code})`,
            message: [
                this.message,
                this.hint
            ].filter(i => i).join("\n")
        });
    }

    static throw(...args: ConstructorParameters<typeof BooruAbuseError>): never {
        throw new this(...args);
    }
}
