import { DOMParser } from "xmldom";

const parser = new DOMParser();
export let parseXML = (document: string) => parser.parseFromString(document).documentElement;
