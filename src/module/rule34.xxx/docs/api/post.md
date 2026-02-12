# Rule34 API Info: Posts

Retrieving posts from the API requires adding the parameter `s=post` to the base
API URL.

```plain text
https://api.rule34.xxx/?page=dapi&q=index&s=post
```

_(including [authentication](./index.md#authentication))_

## Parameters

All of the following parameters are optional.

  - **`tags`**: The query to filter posts by; works the same as searches on the
    site
    - If not specified, returns all posts applicable to other parameters
    - See: [cheatsheet](../search/.given.md)
  - **`id`**: Id of a single post to return
  - **`cid`**: "Change id"; Unix timestamp to get posts by the time of their
    last modification
    > [!IMPORTANT]
    > I'm unsure if this actually works.
    >
    > ```markdown
    > # TODO:
    >   - Search using this parameter
    > ```
  - **`limit`**: The amount of posts returned
    - Hard limit of 1000 per request
    - Defaults to 100
  - **`pid`**: "Page id"; the offset of returned posts based on `limit`
    - Defaults to 0
  - **`json`**: Whether to return results formatted as JSON or XML
    - `1` for JSON, `0` for XML
    - Defaults to `0`
    - Resulting data differs
