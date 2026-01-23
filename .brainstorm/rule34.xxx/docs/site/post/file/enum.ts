// TODO: missing properties
/**
 * Rule34's regional CDN servers for media files.  
 * Used when replacing the subdomain of file URLs.
 */
export declare enum CDNServer { // TODO: better enum name?
    /** The image CDN dedicated to APIs. */
    API = "api-cdn",
    /** The video CDN dedicated to APIs. */
    APIMP4 = "api-cdn-mp4"
}

// TODO: better word for 'animation states?'
/** The possible animation states of a post's media file. */
export declare enum PostFileType {
    /** A still image&mdash;no animation or audio. */
    Static,
    /** An animated, looped image&mdash;no playback control or audio. */
    Animated,
    /** An animated video. */
    Video
}
