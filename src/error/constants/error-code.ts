export const CORE_ERROR = {
    _TEST_ERROR: (...args: any[]) => ({
        message: "This is a test error.",
        hint: [
            "You should not see this error thrown; this error type only exists",
            "to test the functionality of errors. If you've come across this",
            "error naturally, file an issue on GitHub as soon as possible."
        ].join(" ")
    }),
    _TEMP: (reason: string, args: any[]) => ({
        message: [
            "This is a valid error whose message hasn't been defined yet.",
            `Case: ${reason}`,
            `Arguments: ${args.join(", ")}`
        ].join("\n"),
        hint: [
            "This means that this error case has been considered, but the",
            "message wasn't properly implemented before release. If you've",
            "come across this error, please file an issue on GitHub."
        ].join(" ")
    })
} as const;
