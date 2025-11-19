Rule34 has a very stubborn API, as it doesn't provide all the info a developer may seek, and the different result types yield different results, some exclusive. This makes it quite difficult to get many kinds of info, especially post info from a search.

This package's namesake comes from the usage of Rule34's APIs and frontends&mdash;a lot of requests (usually about 2&ndash;4) are made when most of the functions are used.

## Table of contents

### Constructor

- [`Rule34()`](#rule34-constructor)
  
  Creates a new `Rule34` object.

### Static properties

- [`Rule34.PostRating`](#rule34postrating)

  Enum for post content ratings.

- [`Rule34.PostStatus`](#rule34poststatus)
  
  Enum for post publicity statuses.

- [`Rule34.TagType`](#rule34tagtype)

  Enum for tag categories.

### Instance properties

- [`Rule34.api_key`](#rule34prototypeapi_key)

  The `api_key` property initialized for this instance, or `undefined` if unset.

- [`Rule34.user_id`](#rule34prototypeuser_id)
  
  The `user_id` property initialized for this instance, or `undefined` if unset.

- [`Rule34.pass_hash`](#rule34prototypepass_hash)

  The `pass_hash` property initialized for this instance, or `undefined` if unset.

### Instance methods

- [`Rule34.getPost()`](#rule34prototypegetPost)

  Fetches a post by its ID or by the first result of a query.

- [`Rule34.search()`](#rule34prototypesearch)

  Fetches multiple results of a query and/or conditions.

### Examples

<!-- examples -->

## Rule34() constructor

The `Rule34()` constructor creates a [`Rule34`](#) instance that allows accessing the content of rule34.xxx.

### Import

```js
import { Rule34 } from "booru-abuse";
```

### Syntax

```js
new Rule34(config)
```

#### Parameters

- `config`
  An object with three optional properties: [`api_key`](#rule34prototypeapi_key), [`user_id`](#rule34prototypeuser_id), and [`pass_hash`](#rule34prototypepass_hash).
