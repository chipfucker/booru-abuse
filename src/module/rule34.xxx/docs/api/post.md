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
  - **`pid`**: "Page id"; the 0-index offset of returned posts based on `limit`
    - Defaults to 0
  - **`json`**: Whether to return results formatted as JSON or XML
    - `1` for JSON, `0` for XML
    - Defaults to `0`
    - Resulting data differs (see [])

## XML vs. JSON

XML and JSON, of course, return data in different formats. However, due to poor programming, the data they return isn't equivalent.

### XML

XML data is returned as a root node (`<posts>`) with attributes specifying data about the search as a whole. The list of posts are given as children of the root node, being void elements (`<post/>`) with attributes specifying data about the post.

<details>
<summary>XML data example</summary>
<pre lang="xml"><code>&lt;posts
  count = "1"
  offset = "0"
&gt;
  &lt;post
    height         = "1250"
    score          = "393"
    file_url       = "https://api-cdn.rule34.xxx/images/5109/0966...81e4.jpeg"
    parent_id      = ""
    sample_url     = "https://api-cdn.rule34.xxx/images/5109/0966...81e4.jpeg"
    sample_width   = "1136"
    sample_height  = "1250"
    preview_url    = "https://api-cdn.rule34.xxx/thumbnails/5109/thumbnail_0966....81e4.jpg"
    rating         = "q"
    tags           = "1girls 2d ... white_sclera zoologist_(terraria)"
    id             = "5823623"
    width          = "1136"
    change         = "1680758419"
    md5            = "0966b7bb5f64f30010d14d5e98bb81e4"
    creator_id     = "1550138"
    has_children   = "false"
    created_at     = "Fri Mar 18 03:02:02 +0100 2022"
    status         = "active"
    source         = ""
    has_notes      = "false"
    has_comments   = "true"
    preview_width  = "136"
    preview_height = "150"
  /&gt;
&lt;/posts&gt;</code></pre>
<blockquote>[!NOTE]
The preceding example is formatted for better readability, but the actual result uses minimal whitespace. There's only a line break after each <code>post</code> element.
</blockquote>
</details>

#### Details

Attributes of the **root node:**

  - **`count`**: The amount of _total_ posts that can be found from the search query
    - Always an integer
  - **`offset`**: The offset of the returned results in _posts;_ if the `limit` is 5 and the page is `2`, `offset` will be `"10"`
    - Always an integer 
