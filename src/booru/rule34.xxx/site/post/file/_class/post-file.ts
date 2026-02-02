import { PostFileType } from "../_enum/post-file-type.ts";
import type { RawPostJSON } from "../../../../raw/_interface/raw-json-post.ts";
import type { RawPostXML } from "../../../../raw/_interface/raw-xml-post.ts";

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
    thumbnail: PostFile;

    /** The file's type. */
    type: PostFileType;
    /** The directory of the post's files. */
    directory: number;
    /** The hash name of the post's files. */
    hash: string;

    constructor ({ json, xml }: { json: RawPostJSON; xml: RawPostXML; }) {
        this.url = appendId(json.file_url, json.id);
        this.size = {
            width: json.width,
            height: json.height
        };

        if (json.sample_url != json.file_url)
            this.downsample = {
                url: appendId(json.sample_url, json.id),
                size: {
                    width: json.sample_width,
                    height: json.sample_height
                },
                default: json.sample
            };
        this.thumbnail = {
            url: appendId(json.preview_url, json.id),
            size: {
                width: parseInt(xml.preview_width),
                height: parseInt(xml.preview_height)
            }
        };

        this.directory = json.directory;
        this.hash = json.hash;

        const ext = json.image.match(/(?<=\.)[^.]+$/)[0];
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
