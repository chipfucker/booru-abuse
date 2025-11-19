import { JSDOM } from "jsdom";
import { url } from "#lib/url.js";

export * from "./enum.js";

export class Client {
    constructor(config) {
        // ERROR: has to be object
        this.api_key = config.api_key;
        this.user_id = config.user_id;
        this.pass_hash = config.pass_hash;
    }
}