Is it possible to create a class that extends another, but only presents a select few of its properties and methods, a lot like the `Omit` and `Pick` type functions, but for classes?

I want to keep things constant, such as descriptions, return values, and method bodies constant between each kind of tag.

```typescript
export class Client {
  autocomplete(query: string): AutocompleteTag[] { /* ... */ }
  getPostTags(id: number): PostTag[] { /* ... */ }
}

class AutocompleteTag {
  name: string;
  // no id
  count: number;
  // no type
  // no ambiguous

  getWikiURL(): string;
  getSearchURL(): string;
}

class PostTag<T extends TagType = TagType> {
  name: string;
  // no id
  count: number;
  /** This property is meaningful. */
  type: T;
  // no ambiguous

  getWikiURL(): string;
  getSearchURL(): string;
}

class BaseTag<T extends TagType = TagType> {
  name: string;
  id: Id;
  count: number;
  /** This property is meaningful. */
  type: T;
  ambiguous: boolean;

  getWikiURL(): string;
  getSearchURL(): string;
}

export type { BaseTag, AutocompleteTag, PostTag }

export enum TagType { Copyright, Character, Artist, General, Metadata }
```

Instead of repeating several properties over and over like this, I'd want to do something like this, with proper type association:

```typescript
class AutocompleteTag extends BaseTag {
  id: undefined;
  /* (remove JSDoc for property?) */
  type: undefined;
  ambiguous: undefined;
}

class PostTag<T> extends BaseTag<T> {
  id: undefined;
  ambiguous: undefined;
}

class BaseTag<T extends TagType = TagType> {
  name: string;
  id: Id;
  count: number;
  /** This property is meaningful. */
  type: T;
  ambiguous: boolean;

  getWikiURL(): string;
  getSearchURL(): string;
}
```

I couldn't do this without a type error, and I couldn't use the base `Omit` type function. I've found a type function that executes what I want:

```typescript
const Omit = <T, K extends keyof T>(Class: new () => T, keys: K[]): new () => Omit<T, typeof keys[number]> => Class;

class PostTag extends Omit(BaseTag, ["id", "ambiguous"]) { /* ... */ }
```

...But the idea is that I'd prefer to do things as conventionally as possible without some external function that executes what should have a core-language equivalent.

I intended on using an interface before, but I imagine a class would be much more suit when it comes to the return type of functions. Is this true at all, or would an interface make more sense?
