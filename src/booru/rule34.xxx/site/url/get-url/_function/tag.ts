import { BaseTag } from "../../../tag/_interface/base-tag.ts";

export let getWikiURL = (id: BaseTag["id"]): string => `https://rule34.xxx/index.php?page=wiki&s=view&id=${id}`;
export let getSearchURL = (tag: BaseTag["name"]): string => `https://rule34.xxx/index.php?page=post&s=list&tags=${encodeURIComponent(tag)}`;
