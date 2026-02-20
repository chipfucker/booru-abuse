import { parseXML } from "./parse-xml.ts";
import { xmlToObject } from "./xml-to-object.ts";

export let fetchXML = (url: string) =>
    fetch(url)
    .then(r => r.text())
    .then(text => xmlToObject(parseXML(text)));
