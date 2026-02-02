import type { User } from "../../misc/classes/user.ts";

export let getUserURL = (name: User["name"]): string => `https://rule34.xxx/index.php?page=account&s=profile&uname=${name}`;
