Rule34 has a very stubborn API, as it doesn't provide all the info a developer may seek, and the different result types yield different results, some exclusive. This makes it quite difficult to get many kinds of info, especially post info from a search.

This package's namesake comes from the usage of Rule34's APIs and frontends&mdash;a lot of requests (usually about 2&ndash;4) are made when most of the functions are used.

## Description

Traditionally, one would simply fetch from Rule34 using its API URLs.

```js
const post = await fetch(
  "https://api.rule34.xxx/"
  + "?page=dapi&s=post&q=index&json=1&api_key=123abc&user_id=123456"
  + "&id=5823623"
);
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

The reliance on URLs for requests, especially lengthy credentials, make request organization difficult. The common solution is to dynamically create links with a function.

Even with the length of the URLs, the API isn't reliable; each of the different return types have some exclusive info, and even the frontend pages have their own info not found using the APIs.

This package intends to solve that, allowing initialization of constants, simplifying request parameters, and even providing info only found on frontend pages.

With this package, the above example can be simplified. For example:

```js
import { Rule34 } from "booru-abuse";

const post = await Rule34.getPost(5823623);
```

# Table of contents

## Functions

- [`setCredentials()`](#rule34setcredentials)

  Sets the cretentials to use for requests.

- [`getPost()`](#rule34getpost)

  Fetches a post by its ID or by the first result of a query.

- [`search()`](#rule34search)

  Fetches multiple results of a query and/or conditions.

## Enumerables

- [`PostRating`](#rule34postrating)

  Enum for post content ratings.

- [`PostStatus`](#rule34poststatus)
  
  Enum for post publicity statuses.

- [`TagType`](#rule34tagtype)

  Enum for tag categories.

## Objects

- [`Rule34Post`](#rule34post)
  
  Post from rule34.xxx.

# Examples

In this example, the post at ID '5823623' is fetched and the username of its creator is logged.

```js
const post = Rule34.getPost(5823623);
console.log(post.creator.name);
// Logs "grovyleslut"
```

This example fetches multiple results, selects the fourth one, and logs whether its explicit.

```js
Rule34.search("zoologist_(terraria)")
.then(results => {
  const selection = results[3];
  if (selection.rating === Rule34.PostRating.EXPLICIT) {
    console.log("This search's 4th post is explicit!");
  }
});
```

# Functions

## Rule34.setCredentials()

The `setCredentials()` function applies the configured credentials to future requests.

### Syntax

```ts
Rule34.setCredentials({ user_id, api_key, pass_hash?, config? })
```

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

None ([`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)).