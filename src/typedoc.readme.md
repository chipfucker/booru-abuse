Booru Abuse is an NPM package intended to make API interaction with boorus and
other imageboards a breeze.

## Block tags

Booru Abuse has custom block tags defining noteworthy properties of items.

### `@apiRequests`

Defines how many requests are made to the API in regards to the limitations of
API keys.

For example, the `Client.search()` method's `@apiRequests` block tag says _2,_
so if you use a key limited to 50 requests per second, you can only use
`search()` 25 times per second before hitting your API limit.
