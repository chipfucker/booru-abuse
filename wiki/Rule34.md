Rule34 has a very stubborn API, as it doesn't provide all the info a developer may seek, and the different result types yield different results, some exclusive. This makes it quite difficult to get many kinds of info, especially post info from a search.

This package's namesake comes from the usage of Rule34's APIs and frontends&mdash;a lot of requests (usually about 2&ndash;4) are made when most of the functions are used.

### Description

Traditionally, one would simply fetch from Rule34 using its API URLs.

```js
const post = await fetch(
  "https://api.rule34.xxx/"
  + "?page=dapi&s=post&q=index&json=1&api_key=123abc&user_id=123456"
  + "&id=5823623"
);
console.log(post[0].creator);
```

All the info, even credentials, is to be provided in the URL's search parameters. There are usually _many_ keys, some with lengthy values, some unnecessary&mdash;static, but mandatory for the request&mdash;which makes organizing request info difficult.

Each key has a different function. To name the few in the above example:

- `page`: Whether the response is from the API.
- `s`: What kind of data to return.
- `q`: Always `index`.
- `json`: Whether to return results as JSON.
- `api_key`: Allows access to the API.
- `user_id`: Associates the request with a user on the site.
- `id`: The ID of the requested post.

The reliance on URLs for requests, especially credentials, make request organization difficult. The common solution is to dynamically create links with a function.

Even with the length of the URLs, the API isn't reliable; each of the different return types have some exclusive info, and none return some additional info the frontend displays.

This package intends to solve that, simplifying request parameters and allowing initialization of other consistent parameters.

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

- [`Rule34.user_id`](#rule34prototypeuser_id)
  
  The `user_id` property initialized for this instance, or `undefined` if unset.

- [`Rule34.api_key`](#rule34prototypeapi_key)

  The `api_key` property initialized for this instance, or `undefined` if unset.

- [`Rule34.pass_hash`](#rule34prototypepass_hash)

  The `pass_hash` property initialized for this instance, or `undefined` if unset.

### Instance methods

- [`Rule34.getPost()`](#rule34prototypegetPost)

  Fetches a post by its ID or by the first result of a query.

- [`Rule34.search()`](#rule34prototypesearch)

  Fetches multiple results of a query and/or conditions.

## Examples

In this example, the post at ID '5823623' is fetched and its contents are used.

```js
const rule34 = new Rule34({
  api_key: "123456789ABCDEF",
  user_id: 1234567
});

rule34.getPost(5823623)
  .then(post => console.log(post.owner.name));
// Logs "grovyleslut"
```

## Rule34() constructor

The `Rule34()` constructor creates a [`Rule34`](#) instance that allows accessing the content of rule34.xxx.

### Import

```js
import { Rule34 } from "booru-abuse";
```

### Syntax

```js
new Rule34({ user_id, api_key })
new Rule34({ user_id, api_key, config })
new Rule34({ user_id, api_key, pass_hash })
new Rule34({ user_id, api_key, pass_hash, config })
```

> [!NOTE]
> `Rule34()` can only be called with [`new`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new). Attempting to call it without `new` throws a [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError).

#### Parameters

- `user_id`

  The numeric [`user_id`](#rule34prototypeuser_id) link parameter and header to use with API and POST requests respectively. This is currently mandatory.

- `api_key`
  
  The string [`api_key`](#rule34prototypeapi_key) link parameter to use with API requests. This is currently mandatory.

- `pass_hash`

  The [`pass_hash`](#rule34prototypepass_hash) header to use with POST requests. This property is optional.

- `config`
  
  An object that sets up custom configurations applied when sending requests.

#### Return value

When called via `new`, the `Rule34` constructor returns a Rule34 client with methods to access data from rule34.xxx.

### Description

> [!NOTE]
> description go here
