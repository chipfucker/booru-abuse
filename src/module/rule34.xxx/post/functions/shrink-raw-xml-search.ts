import type { RawSearchXML, RawPostXML } from "../interfaces/raw-post-xml.ts";
import type { XMLObject } from "../../../../util/types/xml.ts";

export function shrinkRawXMLSearch(xml: XMLObject): RawSearchXML {
    return {
        ...xml.attr as Omit<RawSearchXML, "posts">,
        posts: xml.children.map((child) => <any> child.attr as RawPostXML)
    };
}