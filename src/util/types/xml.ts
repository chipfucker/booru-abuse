import type { parseXML } from "../functions/parse-xml.ts";

export type XMLDocument = ReturnType<typeof parseXML>;
export type XMLNode = XMLDocument | XMLDocument["children"][number];

export interface XMLObject {
    attr: { [key: string]: string; };
    children: XMLObject[]
}
