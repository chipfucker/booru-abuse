import { DOMParser } from "xmldom";

export let parseXML = (string: string) => new DOMParser().parseFromString(string).documentElement;

export type XMLDocument = ReturnType<typeof parseXML>;
export type XMLNode = XMLDocument["children"][number];
