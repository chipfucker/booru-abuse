import { PostFileType } from "../_enum/post-file-type";

/** A post's media files. */
export class PostFiles implements PostFile {
    url: string;
    size: { width: number; height: number };
    
    /**
     * If one exists, a static, downsampled version of the main file.    
     * A downsampled image will always exist for video files.
     * 
     * This file is always a static image. If the main file is animated, the downsample
     * is usually the thumbnail or first frame of the main file, similarly to the
     * {@linkcode PostFiles.thumbnail thumbnail} property.
     */
    downsample?: PostFile & {
        // TODO: what does this actually label
        /**
         * Whether the downsample saves enough bandwidth to be shown instead of the
         * original image.  
         * This is judged by whether Rule34 displays the downsample by default when a post
         * is viewed.
         * 
         * It's suggested to check both `file.type` and `downsample.default` before using
         * this by default, as this file is always a static image&mdash;it is never
         * animated, regardless of the original file.
         */
        default: boolean;
    };
    /** A much more downsampled and static version of the main file, purposed for a thumbnail. */
    thumbnail: Omit<PostFile, "size">;

    /** The file's type. */
    type: PostFileType;
    /** The directory of the post's files. */
    directory: number;
    /** The hash name of the post's files. */
    hash: string;

    constructor (options: ConstructorOptions) {
        this.url = appendId(options.file_url, options.id);
        this.size = {
            width: options.width,
            height: options.height
        };

        if (options.sample_url != options.file_url)
            this.downsample = {
                url: appendId(options.sample_url, options.id),
                size: {
                    width: options.sample_width,
                    height: options.sample_height
                },
                default: options.sample
            };
        this.thumbnail = {
            url: appendId(options.preview_url, options.id)
        };

        this.directory = options.directory;
        this.hash = options.hash;

        const ext = options.image.match(/(?<=\.)[^.]+$/)[0];
        Object.entries(fileTypes).every(([key, array]) => {
            if (array.includes(ext)) {
                this.type = PostFileType[key];
                return false;
            } else return true;
        });
    }
}

/** A post media file. */
export interface PostFile {
    /** The media URL. */
    url: string;
    /** The dimensions of the media. */
    size: { width: number; height: number };
}

interface ConstructorOptions {
    file_url: string;
    width: number;
    height: number;
    sample_url: string;
    sample_width: number;
    sample_height: number;
    sample: boolean;
    preview_url: string;
    directory: number;
    hash: string;
    image: string;
    id: number;
}

const appendId = <url extends string, id extends number>(url: url, id: id): `${url}?${id}` => `${url}?${id}`;

// TODO
const fileTypes = {
    Static: [
        "jpeg",
        "jpg",
        "png"
    ],
    Animated: [
        "gif"
    ],
    Video: [
        "mp4"
    ]
}
