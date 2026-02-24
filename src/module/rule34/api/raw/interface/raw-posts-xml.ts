type NumericString = `${number}`;
type BooleanString = `${boolean}`;

export interface RawPostsXML {
    attr: {
        count: NumericString;
        offset: NumericString;
    };
    children: { attr: {
        file_url: string;
        width: NumericString;
        height: NumericString;

        sample_url: string;
        sample_width: NumericString;
        sample_height: NumericString;

        preview_url: string;
        preview_width: NumericString;
        preview_height: NumericString;

        id: NumericString;
        creator_id: NumericString;
        parent_id: NumericString | "";
        has_children: BooleanString;
        has_notes: BooleanString;
        rating: "s" | "q" | "e";
        tags: string;
        source: string;

        created_at: string;
        change: NumericString;
        md5: string;
        status: "active" | "flagged" | "deleted";

        score: NumericString;
        has_comments: BooleanString;
    }}[];
}

export type RawPostXML = RawPostsXML["children"][number];
