export interface RawPostsXML {
    count: string;
    offset: string;
    posts: RawPostXML[];
}

export interface RawPostXML {
    file_url: string;
    width: string;
    height: string;

    sample_url: string;
    sample_width: string;
    sample_height: string;

    preview_url: string;
    preview_width: string;
    preview_height: string;
    
    md5: string;
    
    creator_id: string;
    id: string;
    parent_id: string;
    source: string;
    rating: string;

    created_at: string;
    change: string;
    status: string;
    
    score: string;
    tags: string;
    has_notes: string;
    has_children: string;
    has_comments: string;
}
