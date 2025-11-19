import Enum from "#lib/enum.js";

export let PostRating = Enum([ "Safe", "Questionable", "Explicit" ])
    .freeze();
export let PostStatus = Enum([ "Active", "Flagged", "Deleted" ])
    .freeze();

export let TagType = Enum([
    "Copyright",
    "Character",
    "Artist",
    "General",
    "Metadata",
    "Null"
])
    .freeze();