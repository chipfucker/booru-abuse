Rule34 has a very stubborn API, as it doesn't provide all the info a developer may seek, and the different result types yield different results, some exclusive. This makes it quite difficult to get many kinds of info, especially post info from a search.

This package's namesake comes from the usage of Rule34's APIs and frontends&mdash;a lot of requests (usually about 2&ndash;4) are made when most of the functions are used.

## Constructor

- [`Rule34()`](./constructor)
  
  Creates a new `Rule34` object.

## Static properties

- [`Rule34.PostRating`](./PostRating)

  Enum for post content ratings.

- [`Rule34.PostStatus`](./PostStatus)
  
  Enum for post publicity statuses.

- [`Rule34.TagType`](./TagType)

  Enum for tag categories.

## Instance properties

- [`Rule34.api_key`](./api_key)

  The `api_key` property initialized for this instance, or `undefined` if unset.

- [`Rule34.user_id`](./user_id)
  
  The `user_id` property initialized for this instance, or `undefined` if unset.

- [`Rule34.pass_hash`](./pass_hash)

  The `pass_hash` property initialized for this instance, or `undefined` if unset.

## Instance methods

- [`Rule34.getPost()`](./getPost)

  Fetches a post by its ID or by the first result of a query.

- [`Rule34.search()](./search)

  Fetches multiple results of a query and/or conditions.