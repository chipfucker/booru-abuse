import { PostFiles } from "../file/_class/post-file";

/** A post from rule34.xxx. */
export class Post {
    /** The media files of the post. */
    file: PostFiles;
    /** The unique Id of the post. */
    id: number;
    /** The parent post's Id. */
    parent?: number;
    /** The Ids of this post's children. */
    children: number[]; // CONTINUE
    /** The total upvotes of this post. */
    score: number;

    constructor (options: ConstructorOptions) {}
}

interface ConstructorOptions {

}
