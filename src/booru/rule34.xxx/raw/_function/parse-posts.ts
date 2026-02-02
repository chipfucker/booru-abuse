import { parseXML, type XMLDocument, type XMLNode } from "../../../../util/_function/xml.ts";
import type { RawSearchXML, RawPostXML } from "../_interface/raw-xml-post.ts";

export function parsePosts(xml: string): RawSearchXML {
    const document = parseXML(xml);
    return parseDocument(document);
}

function parseDocument(xml: XMLDocument): RawSearchXML {
    const result = <RawSearchXML> {
        posts: [] as RawSearchXML["posts"]
    };

    let getAttribute = (attr: string) => xml.getAttribute(attr);
    documentAttributes.forEach(attr => result[attr] = getAttribute(attr)!);

    Array.from(xml.getElementsByTagName("post"))
    .forEach(element => result.posts.push(parseElement(element)));
    
    return result;
}

const documentAttributes: (keyof Omit<RawSearchXML, "posts">)[] = [
    "count", "offset"
];

function parseElement(node: XMLNode): RawPostXML {
    let getAttribute = (attr: string) => node.getAttribute(attr);

    const post = <RawPostXML> {};
    attributes.forEach(attr => post[attr] = getAttribute(attr)!);

    return post;
}

const attributes: (keyof RawPostXML)[] = [
    "file_url", "width", "height",

    "sample_url", "sample_width", "sample_height",

    "preview_url", "preview_width", "preview_height",
    
    "md5",
    
    "creator_id",
    "id", "parent_id",
    "source",
    "rating",
    
    "created_at", "change",
    "status",
    
    "score",
    "tags",
    "has_notes", "has_children", "has_comments"
];