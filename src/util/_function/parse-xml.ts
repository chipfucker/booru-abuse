import { DOMParser } from "xmldom.ts";

export let parseXML = (string: string) => new DOMParser().parseFromString(string).documentElement;

export type XMLDocument = ReturnType<typeof parseXML>;
export type XMLNode = XMLDocument["children"][number];
