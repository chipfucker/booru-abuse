import { PostFileURL } from "../class/post-file"
import { CDNServer   } from "../enum/cdn-server"

/**
 * A post's downsampled media file.
 */
export declare interface PostDownsampleFile extends PostFileURL {
    /**
     * Whether the downsample should be used instead of the original for bandwidth purposes.  
     * This is judged by whether Rule34 displays the downsample by default when a post is viewed.
     * 
     * It's suggested to check both `file.type` and `downsample.default` before using this by default, as this file is always a static image&mdash;it is never animated, regardless of the original file.
     */
    default: boolean
}
