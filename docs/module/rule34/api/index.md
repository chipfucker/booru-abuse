# Rule 34 API Info

The Rule 34 API allows for accessing posts, comments, and tags from rule34.xxx.

## URL

The base URL for Rule 34 API requests looks like the following:

```plain text
https://api.rule34.xxx/?page=dapi&q=index
```

> [!NOTE]
> The URL may also contain the implicit `index.php` at the end of the path[^1],
> which is what the official API documentation (unconsciously) suggests:
>
> ```plain text
> https://api.rule34.xxx/index.php?page=dapi&q=index
> ```

An additional parameter `s` should follow describing the type of data being
retrieved, such as `s=post` or `s=comment`.

The API also requires that [two additional authentication parameters] follow.

[two additional authentication parameters]: #authentication

## Authentication

All request data sent to the API is sent as URL parameters. This includes
authentication.

Requests must have two extra parameters, those being `api_key` and
`user_id`[^1]. If authentication is invalid, you will always get the following
response:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<error>
  Missing authentication. Go to api.rule34.xxx for more information
</error>
```

> [!NOTE]
> The preceding sample is formatted for better readability, but the actual
> response is formatted differently.

Beware that, because of the length of API keys, API URLs tend to look very
lengthy. It is recommended practice to use utilities and functions to convert
objects to URLs.

## Server

When using the API properly, you should never receive an error unless the server
is overloaded or the search dies (needs clarification[^X.1]). When the server
_does_ break, you will receive a response success of "false" and a message
stating something along the lines of "search down" (needs clarification[^X.2]).

[^1]: This rule does not apply to the API's tag search autocompletion endpoint.

[^X.1]: It is uncertain what circumstances may cause a search to die.

[^X.2]: It is uncertain what this response may look like. The official
  documentation doesn't elaborate what a "response success of 'false' with a
  message" means, nor does it say explicitly what the message is.
