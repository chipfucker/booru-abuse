import Enum from "#lib/enum.js";

export let PostRating = Enum([
    "SAFE",
    "QUESTIONABLE",
    "EXPLICIT"
])
    .freeze();
export let PostStatus = Enum([
    "ACTIVE",
    "FLAGGED",
    "DELETED"
])
    .freeze();

export let TagType = Enum([
    "COPYRIGHT",
    "CHARACTER",
    "ARTIST",
    "GENERAL",
    "METADATA",
    "NULL"
])
    .freeze();