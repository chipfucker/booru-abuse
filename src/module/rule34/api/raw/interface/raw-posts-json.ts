interface RawPost {
    file_url: string;
    width: number;
    height: number;

    sample: boolean;
    sample_url: string;
    sample_width: number;
    sample_height: number;

    preview_url: string;

    id: number;
    owner: string;
    parent_id: number;
    has_notes: boolean;
    rating: "safe" | "questionable" | "explicit";
    tags: string;
    source: string;

    change: number;
    hash: string;
    directory: number;
    image: string;
    status: "active" | "flagged" | "deleted";

    score: number;
    comment_count: number;
}

interface TagInfo {
    tag_info: {
        count: number;
        tag: string;
        type: "copyright" | "character" | "artist" | "tag" | "metadata" | null;
    }[];
}

export type RawPostJSON<T extends boolean | unknown = unknown> = RawPost & (
    T extends true
        ? TagInfo
        : T extends false
            ? {}
            : Partial<TagInfo>
);

export type RawPostsJSON = RawPostJSON[];
