export interface RawPostJSON {
    file_url: string;
    width: number;
    height: number;

    sample: boolean;
    sample_url: string;
    sample_width: number;
    sample_height: number;

    preview_url: string;

    directory: number;
    hash: string;
    image: string;

    owner: string;
    id: number;
    parent_id: number;
    source: string;

    rating: string;
    change: number;
    score: number;
    status: string;

    tags: string;
    has_notes: boolean;
    comment_count: number;
    tag_info: {
        tag: string;
        count: number;
        type: string;
    }[];
};
