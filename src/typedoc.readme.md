Booru Abuse is an NPM package intended to make API interaction with boorus and
other imageboards a breeze.

## Block tags

  - ### `@apiRequests`

    Defines how many requests are made to the API in regards to the limitations of
    API keys.

    For example, the `Client.search()` method's `@apiRequests` block tag says _2,_
    so if you use a key limited to 50 requests per second, you can only use
    `search()` 25 times per second before hitting your API limit.

    If a method states that its `@apiRequests` is _1?,_ it can either use one
    request or _no_ requests to return its value. Similarly, if it's _1|2,_ it can
    return using one or two requests.
