import { parseXML, type XMLDocument, type XMLNode } from "../../../../util/_function/xml.ts";
import type { RawComment } from "../_interface/raw-comment.ts";

export function parseComments(xml: string): RawComment[] {
    const document = parseXML(xml);
    return parseDocument(document);
}

function parseDocument(xml: XMLDocument): RawComment[] {
    return Array.from(xml.children).map(parseElement);
}

function parseElement(node: XMLNode): RawComment {
    let getAttribute = node.getAttribute;

    const post = <RawComment> {};
    attributes.forEach(attr => post[attr] = getAttribute(attr)!);

    return post;
}

const attributes: (keyof RawComment)[] = [
    "post_id", "id",
    "creator", "creator_id",
    "body",
    "created_at"
];
