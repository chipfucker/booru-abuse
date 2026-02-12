# Rule34 API Info

The Rule34 API allows for accessing posts, comments, and tags from rule34.xxx.

## URL

The domain for Rule34 API requests looks like this.

```plain text
https://api.rule34.xxx/
```

> [!NOTE]
> The URL can also contain the implicit `index.php` at the end of the path,
> which is what the official API documentation suggests:
>
> ```plain text
> https://api.rule34.xxx/index.php
> ```

All data sent to the API, even including sensitive info--such as
[authentication](#authentication)--is sent as URL parameters.

The base parameters to add to all requests are as follows:

  - **`page`**: `dapi` to access the API
  - **`q`**: `index` to access the 'index' page

> [!IMPORTANT]
> I'm unsure what each parameter describes; this is my best guess.
>
> ```markdown
> # TODO
>   - Open different pages and compare their `page` and `q` params
> ```

I.e. the base URL for Rule34 API requests looks like this.

```plain text
https://api.rule34.xxx/?page=dapi&q=index
```

An additional parameter `s` usually follows describing the type of data being
retrieved, such as `s=post` or `s=comment`.

## Authentication

All requests must have two extra parameters, those being `api_key` and
`user_id`. If authentication is invalid, you will always get the following
response:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<error>
  Missing authentication. Go to api.rule34.xxx for more information
</error>
```

> [!NOTE]
> The preceding example is formatted for better readability, but the actual
> response is a one-liner; it does not use line breaks.

## Server

When using the API properly, you should never receive an error unless the server
is overloaded or the search dies. When the server _does_ break, you will receive
a response success of "false" and a message stating something along the lines of
"search down."

> [!IMPORTANT]
> > When the server _does_ break ... something along the lines of "search down."
>
> I'm not entirely sure what this means.
>
> ```markdown
> # TODO
>   - Find out when a search breaks
>     - Test broken searches with different return types
>   - Find out what a failed response looks like
> ```
