import {
    PostDownsampledFile,
    PostFileExtension,
    CDNServer,
    PostFileType
} from "../../../../export"

/** A post's media files. */
export declare class PostFile extends PostFileURL {
    /** The file's type. */
    type: PostFileType
    /**
     * If one exists, a static, downsampled version of the main file.  
     * If one doesn't exist, this mirrors the main file.  
     * A downsampled image will, however, always exist for animated files.
     * 
     * This file is always a static image. If the main file is animated, the downsample
     * is usually the thumbnail or first frame of the main file.
     */
    downsample: PostDownsampledFile
    /** A much more downsampled and static version of the main file, purposed for a thumbnail. */
    thumbnail: PostFileURL
    /** The directory of the post's files. */
    directory: number
    /** The hash name of the post's files. */
    hash: string
    /** The file's extension. */
    extension: PostFileExtension
}

/**
 * A post media file.
 * 
 * The URL of each image is structured like so:
 * 
 * ```plain text
 * https://api-cdn.rule34.xxx/images/1234/1234567890abcdef.jpg
 *         ├─────┘            ├────┘ ├──┘ ├──────────────┘ ├─┘
 *         Server reg.        Var.   Dir  Hash             Extension
 * ```
 */
export declare class PostFileURL extends URL {
    /** The dimensions of the media file. */
    size: [ width: number, height: number ]

    /**
     * Return the URL object with a different CDN subdomain.
     * @param region The region to use.
     */
    withServerRegion(region: CDNServer): PostFileURL
}
