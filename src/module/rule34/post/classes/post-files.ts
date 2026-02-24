import { PostFileType } from "../enums/post-file-type.ts";
import type { RawPostJSON } from "../../api/raw/interface/raw-posts-json.ts";
import type { RawPostXML } from "../../api/raw/interface/raw-posts-xml.ts";

/** A set of the files of a post. */
export class PostFile {
    url: string;
    size: [ width: number, height: number ];
    
    constructor (url: string, size: [ width: number, height: number ]) {
        this.url = url;
        this.size = size;
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

    static fromObjects(objects: {
        json: RawPostJSON;
        xml: RawPostXML;
    }): PostFile {
        return new PostFiles(objects);
    }

    constructor ({ json, xml: { attr: xml }}: { json: RawPostJSON; xml: RawPostXML; }) {
        super(json.file_url, [ json.width, json.height ]);
        
        this.downsample = <any> new PostFile(
            json.sample_url,
            [ json.sample_width, json.sample_height ]
        );
        this.downsample.exists = this.url !== this.downsample.url;

        this.thumbnail = new PostFile(
            json.preview_url,
            [ parseInt(xml.preview_width), parseInt(xml.preview_height) ]
        );

        const ext = json.image.match(/(?<=\.)\w+$/)![0];

        this.type = PostFileType[
            Object.keys(PostFiles.FILE_EXTENSIONS).find(key =>
                PostFiles.FILE_EXTENSIONS[key].includes(ext)
            )
        ];
        // ERROR

        this.directory = json.directory;
        this.hash = json.hash;
    }
}
