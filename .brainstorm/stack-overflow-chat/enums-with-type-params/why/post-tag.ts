/** Tag types */
enum TagType {
    Copyright, Character, Artist
}

/** Base tag interface */
interface BaseTag<T extends TagType = TagType> {
    name: string
    count: number
    type: T
}

/** Tag found from Post instances */
type PostTag<T> = Pick<BaseTag<T>, "name"|"type">

/** Array of PostTag with extended methods */
declare class PostTags extends Array<PostTag> {
    /** Equivalent to `Array.filter(tag => tag.type === TagType["some type"])` */
    category<T extends TagType>(category: T): PostTag<T>[]
}

/** Exported class that utilizes PostTags */
export declare class Post {
    tags: PostTags
}

// expected use
let character = (new Post()).tags.category(TagType.Character)[0].type
// 'character' should display "TagType.Character" or its value on hover

character === 2;
// should display 'unintentional comparison' warning