import { User } from "../../../_class/user.ts";

export let getURL = (name: User["name"]): string => `https://rule34.xxx/index.php?page=account&s=profile&uname=${name}`;
