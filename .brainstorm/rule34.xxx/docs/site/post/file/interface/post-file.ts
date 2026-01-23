import { CDNServer } from "../enum/cdn-server"

/**
 * A post media file.
 */
export declare interface PostFile {
    /** The media's CDN URL. */
    url: string & {
        /**
         * Modify the URL to use a different CDN subdomain.
         * @param region The region to use.
         */
        changeServerRegion(region: CDNServer): void
        /**
         * Return the URL with a different CDN subdomain.
         * @param region The region to use.
         */
        withServerRegion(region: CDNServer): string
    }
    /** The dimensions of the media file. */
    size: [ width: number, height: number ]
}
