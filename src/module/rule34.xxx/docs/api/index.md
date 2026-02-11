# Rule34 API Info

The base URL for Rule34 API requests looks like this.

```
https://api.rule34.xxx/?page=dapi&q=index
```

## Authentication

All requests must have two extra parameters, those being `api_key` and `user_id`. If authentication is invalid, you will always get the following response:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<error>
  Missing authentication. Go to api.rule34.xxx for more information
</error>
```

> [!NOTE]
> The preceding example is formatted for better readability, but the actual response is a one-liner; it does not use line breaks.

## Server

When using the API properly, you should never receive an error unless the server is overloaded or the search dies. When the server _does_ break, you will receive a response success of "false" and a message stating something along the lines of "search down."

> [!IMPORTANT]
>
> > When the server _does_ break, ... something along the lines of "search down."
>
> I'm unsure what this means. I'll find out what that kind of response looks like and when it varies.
>
> ```markdown
> # TODO
>   - Find out when a search breaks
>   - Find out what a failed response looks like
