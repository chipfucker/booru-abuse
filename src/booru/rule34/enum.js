import Enum from "#lib/enum.js";

export let PostRating = Enum(
    "SAFE",
    "QUESTIONABLE",
    "EXPLICIT"
);
export let PostStatus = Enum(
    "ACTIVE",
    "FLAGGED",
    "DELETED"
);

export let TagType = Enum(
    "COPYRIGHT",
    "CHARACTER",
    "ARTIST",
    "GENERAL",
    "METADATA",
    "NULL"
);