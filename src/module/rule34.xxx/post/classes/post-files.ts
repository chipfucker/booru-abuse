import { PostFileType } from "../enums/post-file-type";
import type { RawPostJSON } from "../interfaces/raw-post-json";
import type { RawPostXML } from "../interfaces/raw-post-xml";

/** The media files of a post. */
export class PostFiles {
    url: string;
    size: { width: number; height: number };
    
    /**
     * If one exists, a static, downsampled version of the main file.    
     * A downsampled image will always exist for video files.
     * 
     * This file is always a static image. If the main file is animated, the downsample
     * is usually the thumbnail or first frame of the main file, similarly to the
     * {@linkcode PostFiles.thumbnail thumbnail} property.
     * 
     * It's recommended to check the {@linkcode PostFiles.type type} property before
     * using this for main displays, so as to not show a static image in place of an
     * animated video or GIF.
     */
    downsample: (PostFile | Pick<this, keyof PostFile>) & {
        /**
         * Whether a downsample exists for this instance.  
         * Equivalent to checking if `this.url` is the same as `this.downsample.url`.
         */
        exists: boolean;
    } = <any> undefined;

    /** A much more downsampled and static version of the main file, purposed for a thumbnail. */
    thumbnail: PostFile;

    /** The file's type. */
    type: PostFileType = <any> undefined;
    /** The directory of the post's files. */
    directory: number;
    /** The hash name of the post's files. */
    hash: string;

    static fromObject(object: { json: RawPostJSON; xml: RawPostXML; }): PostFiles {
        return new PostFiles(object);
    }

    constructor ({ json, xml }: { json: RawPostJSON; xml: RawPostXML; }) {
        this.url = appendId(json.file_url, json.id);
        this.size = {
            width: json.width,
            height: json.height
        };

        this.downsample = {
            url: appendId(json.sample_url, json.id),
            size: [
                json.sample_width,
                json.sample_height
            ],
            exists: <any> undefined
        };
        this.downsample.exists = this.url !== this.downsample.url;
        
        this.thumbnail = {
            url: appendId(json.preview_url, json.id),
            size: [
                parseInt(xml.preview_width),
                parseInt(xml.preview_height)
            ]
        };

        this.directory = json.directory;
        this.hash = json.hash;

        const ext = json.image.match(/(?<=\.)[^.]+$/)![0];
        Object.entries(extensions).every(([key, array]) => {
            if (array.includes(ext)) {
                this.type = PostFileType[key as keyof typeof PostFileType];
                return false;
            } else return true;
        });
    }
}

interface PostFile {
    /** The media URL. */
    url: string;
    /** The dimensions of the media. */
    size: [ width: number, height: number ];
}

const appendId = (url: string, id: number): string => `${url}?${id}`;

const extensions: Record<keyof typeof PostFileType, string[]> = {
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
};
