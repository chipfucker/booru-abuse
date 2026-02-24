import type { Client } from "../../client/classes/client.ts";
import { PostFiles } from "./post-files.ts";
import { PostRating } from "../enums/post-rating.ts";
import { PostAuthor } from "./post-author.ts";
import { PostStatus } from "../enums/post-status.ts";

/** A post. */
export class Post {
    protected client: Client;
    protected hasChildren: boolean;
    protected commentCount: boolean;

    file: PostFiles;

    id: number;
    parent: number | null;
    source: string;
    rating: PostRating;
    author: PostAuthor;

    created: Date;
    modified: Date;
    status: PostStatus;

    score: number;
    tags: PostTags;
}