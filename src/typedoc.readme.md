Booru Abuse is an NPM package intended to make API interaction with boorus and
other imageboards a breeze.

## Block tags

Booru Abuse has custom block tags defining noteworthy properties of items.

### `@apiRequests`

Defines how many requests are made to the API in regards to the limitations of
API keys.

For example:

```typescript
class Client {
  /**
   * Returns posts resulting from a search query.
   * @apiRequests 2: post(json, xml)
   */
  async search(): Promise<Posts>
}
```

If you use a key limited to 50 requests per second, you can only use the
`Client.search()` method 25 times per second because it uses 2 requests per use.
