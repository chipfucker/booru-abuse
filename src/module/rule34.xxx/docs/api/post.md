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

  ```xml
  <posts
    count = "1"
    offset = "0" >
    <post
      file_url       = "https://api-cdn.rule34.xxx/images/5109/0966...81e4.jpeg"
      width          = "1136"
      height         = "1250"

      sample_url     = "https://api-cdn.rule34.xxx/images/5109/0966...81e4.jpeg"
      sample_width   = "1136"
      sample_height  = "1250"

      preview_url    = "https://api-cdn.rule34.xxx/thumbnails/5109/thumbnail_0966....81e4.jpg"
      preview_width  = "136"
      preview_height = "150"

      id             = "5823623"
      creator_id     = "1550138"
      parent_id      = ""
      has_children   = "false"
      has_notes      = "false"
      rating         = "q"
      tags           = "1girls 2d ... white_sclera zoologist_(terraria)"
      source         = ""

      created_at     = "Fri Mar 18 03:02:02 +0100 2022"
      change         = "1680758419"
      md5            = "0966b7bb5f64f30010d14d5e98bb81e4"
      status         = "active"

      score          = "393"
      has_comments   = "true" />
  </posts>
  ```

  > [!NOTE]
  > The preceding example is formatted for better readability, but the actual
  > result uses minimal whitespace, and the data is ordered differently.

</details>

#### Details

Attributes of the **root node:**

  - **`count`**: The amount of _total_ posts that can be found from the search
    query
    - Always an integer
  - **`offset`**: The offset of the returned results in _posts;_ if the `limit`
    is 5 and the page is `2`, `offset` will be `"10"`
    - Always an integer

Attributes of **child element nodes:**

  - **`file_url`**: The CDN URL of the main file
  - **`width`**: The width of the main file in pixels
    - Always an integer
  - **`height`**: The height of the main file in pixels
    - Always an integer
  - **`sample_url`**: The CDN URL of a downsample of the main file
  - **`sample_width`**: The width of the downsampled image in pixels
    - Always an integer
  - **`sample_height`**: The height of the downsampled image in pixels
    - Always an integer
  - **`preview_url`**: The CDN URL of a highly downsampled version of the main file
  - **`preview_width`**: The width of the preview URL in pixels
    - Always an integer
  - **`preview_height`**: The height of the preview URL in pixels
    - Always an integer
  - **`id`**: The unique ID of the post
    - Always an integer
  - **`creator_id`**: The ID of the creator of the post
    - Always an integer
  - **`parent_id`**: The ID of the post set as the parent
    - Always an integer or empty
  - **`has_children`**: Whether one or more posts have the post set as their
    parent
    - Always boolean (`true` or `false`)
  - **`has_notes`**: Whether the image has notes associated
    - Always boolean (`true` or `false`)
  - **`rating`**: The 'maturity' rating of the image
    - Always `s`, `q`, or `e`
  - **`tags`**: The list of tags on the post sorted alphabetically and separated
    by a space
  - **`source`**: The string set as the source of the post
    - Can be any or empty
  - **`created_at`**: The date of the post's creation
    - Always a [`Date`] parsable:
      1. Day of the week; truncated, capital
         > [!IMPORTANT]
         > I'm unsure whether it's truncated or always 3 letters; it may vary in
         > cases of Tuesday or Thursday ("Tues" and "Thur" or alike).
         >
         > ```markdown
         > # TODO:
         >   - Check the creation dates of posts from each day of the week
         > ```
      2. Month; truncated (3 letters), capital
      3. Day of the month
         > [!IMPORTANT]
         > I'm unsure whether the number has padding zeros.
         >
         > ```markdown
         > # TODO:
         >   - Check the creation dates of posts from different days of the
         >     month
         > ```
      4. The hour, minute, and second; separated by colons, each padded with two
         zeros
      5. The timezone
         > [!IMPORTANT]
         > I'm unsure if the timezone is always `+0100`.
         >
         > ```markdown
         > # TODO:
         >   - Check the creation dates of posts from different devices and IP
         >     addresses
         > ```
      6. Year
  - **`change`**: The Unix timestamp, in seconds, of the date the post was last
    updated
    - Always an integer
  - **`md5`**: The MD5 hash of the post
    - Always a hexadecimal string
  - **`status`**: The visibility status of the post
    - Always `active`, `flagged`, or `deleted`
  - **`score`**: The amount of upvotes given to the post
    - Always an integer
  - **`has_comments`**: Whether this post has one or more comments
    - Always boolean (`true` or `false`)

[`Date`]: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date>
