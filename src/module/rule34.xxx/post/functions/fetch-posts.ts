import { shrinkRawXMLSearch } from "./shrink-raw-xml-search.ts";
import { fetchJSON } from "../../../../util/functions/fetch-json.ts";
import { fetchXML } from "../../../../util/functions/fetch-xml.ts";
import type { RawPostJSON } from "../interfaces/raw-post-json.ts";
import type { RawSearchXML } from "../interfaces/raw-post-xml.ts";

export let fetchPostsJSON = (url: string): Promise<RawPostJSON[]> => fetchJSON(url);

export let fetchPostsXML = (url: string): Promise<RawSearchXML> => fetchXML(url).then(shrinkRawXMLSearch);
