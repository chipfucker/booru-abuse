import { Authentication } from "../interfaces/authentication.ts";

/** Client to retrieve data from Rule 34 at rule34.xxx. */
export class Client {
    #auth: Authentication;
    private authorized: boolean = false;
}
