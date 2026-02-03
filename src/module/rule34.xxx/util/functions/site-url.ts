import type { User } from "../../misc/classes/user.ts";
import type { BaseTag } from "../../tag/interfaces/base-tag.ts";

export let search = (query: string): string => `https://rule34.xxx/index.php?page=post&s=list&tags=${encodeURIComponent(query)}`;

export let tagWiki = (id: BaseTag["id"]): string => `https://rule34.xxx/index.php?page=wiki&s=view&id=${id}`;

export let user = (name: User["name"]): string => `https://rule34.xxx/index.php?page=account&s=profile&uname=${name}`;
