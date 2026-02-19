let concat: {
    (joiner: string, ...items: any[]):
        ReturnType<Array<typeof items>["join"]>;
    line:  (...items: any[]) => ReturnType<typeof concat>;
    space: (...items: any[]) => ReturnType<typeof concat>;
} = ((joiner, ...items) => items.join(joiner)) as typeof concat;
concat.line  = (...items) => concat("\n", ...items);
concat.space = (...items) => concat(" ", ...items);

export type ErrorCode = keyof typeof ERROR_CODE;

export const ERROR_CODE: {
    readonly [K: string]: (...args: any[]) => {
        message: string;
        hint?: string;
    };
} = {
    _TEST_ERROR: (...args: any[]) => ({
        message: concat.line(
            "This is a test error.",
            `Arguments: ${args.length ? args.join(", ") : "none"}`
        ),
        hint: concat.space(
            "You should not see this error thrown; this error type only exists",
            "to test the functionality of errors. If you've come across this",
            "error naturally, file an issue on GitHub as soon as possible."
        )
    }),
    _TEMP: (reason: string, args: { [K: string]: any; }) => ({
        message: concat.line(
            "This is a valid error whose message hasn't been defined yet.",
            `Case: ${reason}`,
            `Arguments: ${JSON.stringify(args, null, 2)}`
        ),
        hint: concat.space(
            "This means that this error case has been considered, but the",
            "message wasn't properly implemented before release. If you've",
            "come across this error, please file an issue on GitHub."
        )
    })
};
