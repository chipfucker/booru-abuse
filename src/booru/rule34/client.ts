import type * as type from "./type"
import { Post } from "./post"

export class Client {
    async constructor({ auth, config }: {
        auth: Auth
        config?: {}
    }) {

    }

    async autocomplete(query: string): Promise<type.PostTag[] | Omit<type.PostTag, "type">[]> {

    }

    async getPost(id: type.ID): Promise<Post | null> {
        
    }
}
