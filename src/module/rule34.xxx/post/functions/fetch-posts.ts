import { shrinkRawXMLSearch } from "./shrink-raw-xml-search.ts";
import { fetchXML } from "../../../../util/functions/fetch-xml.ts";

export let fetchPostsXML = (url: string) => fetchXML(url).then(shrinkRawXMLSearch);
