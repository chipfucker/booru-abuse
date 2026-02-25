import { PostFileType } from "../enums/post-file-type.ts";
import type { RawPostJSON } from "../../api/raw/interface/raw-posts-json.ts";
import type { RawPostXML } from "../../api/raw/interface/raw-posts-xml.ts";

/** A set of the files of a post. */
export class PostFile {
    url: string;
    size: [ width: number, height: number ];

    static fromObject(object: ConstructorParameters<typeof this>[0]) {
        return new this(object);
    }
    
    protected constructor (object: {
        url: string;
        size: [ width: number, height: number ];
    }) {
        this.url = object.url;
        this.size = object.size;
    }
}

/** The files of a post. */
export class PostFiles extends PostFile {
    static FILE_EXTENSIONS = <const> {
        Static: [ "jpeg", "jpg", "png" ],
        Animated: [ "gif" ],
        Video: [ "mp4" ]
    } satisfies {
        [K in keyof typeof PostFileType]: string[];
    };

    downsample: PostFile & { exists: boolean; };
    thumbnail: PostFile;

    type: PostFileType;
    directory: number;
    hash: string;
    extension: string;

    static fromRaw({json, xml: { attr: xml }}: {
        json: RawPostJSON;
        xml: RawPostXML;
    }) {
        return this.fromObject({
            url: json.file_url,
            size: [ json.width, json.height ],
            downsample: {
                url: json.sample_url,
                size: [ json.sample_width, json.sample_height ]
            },
            thumbnail: {
                url: json.preview_url,
                size: [
                    parseInt(xml.preview_width),
                    parseInt(xml.preview_height)
                ]
            },
            directory: json.directory,
            hash: json.hash,
            image: json.image
        });
    }

    static fromObject(object: ConstructorParameters<typeof this>[0]) {
        return new this(object);
    }

    protected constructor (object: {
        url: string;
        size: [ width: number, height: number ];
        downsample: {
            url: string;
            size: [ width: number, height: number ];
        };
        thumbnail: {
            url: string;
            size: [ width: number, height: number ];
        };
        directory: number;
        hash: string;
        image: string;
    }) {
        super(object);
        this.downsample = <any> PostFile.fromObject(object.downsample);
        this.downsample.exists = this.url !== this.downsample.url;
        this.thumbnail = PostFile.fromObject(object.thumbnail);

        const ext = object.image.match(/(?<=\.)\w+$/)![0];

        this.type = PostFileType[
            Object.keys(PostFiles.FILE_EXTENSIONS).find(key =>
                PostFiles.FILE_EXTENSIONS[key].includes(ext)
            )
        ];
        // ERROR

        this.directory = object.directory;
        this.hash = object.hash;
    }
}
