import type {
    Auth,
    ID,
    PostTag,
} from "./type" // TODO: https://www.reddit.com/r/typescript/comments/gwofcn
import { Post } from "./post"

export class Client {
    async constructor({ auth, config }: {
        auth: Auth
        config?: {}
    }) {

    }

    async autocomplete(query: string): Promise<PostTag[] | Omit<PostTag, "type">[]> {

    }

    async getPost(id: ID): Promise<Post | null> {
        
    }
}
