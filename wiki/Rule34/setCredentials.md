---
title: Rule34.setCredentials()
description: booru-abuse Rule34 function to apply credentials
---

The `setCredentials()` function applies the configured credentials to future requests.

## Syntax

```ts
Rule34.setCredentials({
  user_id: number | string,
  api_key: string,
  pass_hash?: string,
  config?: {}
})
```

### Parameters

- `user_id` &mdash; The numeric [`user_id`](./user_id) link parameter and header to use with API and POST requests respectively. This is currently mandatory.
- `api_key` &mdash; The string [`api_key`](./api_key) link parameter to use with API requests. This is currently mandatory.
- `pass_hash` &mdash; The [`pass_hash`](./pass_hash) header to use with POST requests. This property is optional.
- `config` &mdash; An object that sets up custom configurations applied when sending requests.

### Return value

None ([`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)).
