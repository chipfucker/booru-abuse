# Rule34 API Info: Posts

Retrieving posts from the API requires adding the parameter `s=post` to the base
API URL.

```plain text
https://api.rule34.xxx/?page=dapi&q=index&s=post
```

_(including [authentication](./index.md#authentication))_

## Parameters

All of the following parameters are optional. ("Defaults to _x_" means the returned results are equivalent to specifying the parameter as __x__.)

  - **`tags`**: The query to filter posts by; works the same as searches on the
    site
    - If not specified, returns all posts applicable to other parameters
    - See: [cheatsheet](../search/.given.md)
  - **`id`**: Id of a single post to return
    - Integer
  - **`limit`**: The amount of posts returned
    - Integer
    - Hard limit of 1000 per request
    - Defaults to 100
  - **`pid`**: "Page id"; the 0-index offset of returned posts based on `limit`
    - Integer
    - Defaults to 0
  - **`json`**: Whether to return results formatted as JSON or XML
    - `1` for JSON, `0` for XML
    - Defaults to `0`
    - Resulting data differs

> [!WARNING]
> The official Rule34 API documentation suggests you may use `cid` as a
> parameter, which represents the "change id" of a post. However, this does not
> affect the search whatsoever.

## XML vs. JSON

XML and JSON, of course, return data in different formats. However, due to poor
programming, the data they return isn't equivalent.

### XML

XML data is returned as a root node (`<posts>`) with attributes specifying data
about the search as a whole. The list of posts are given as children of the root
node, being void elements (`<post/>`) with attributes specifying data about the
post.

<details><summary>XML data example</summary>

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
> The example is formatted for better readability, but the actual result is
> formatted differently.

</details>

### JSON

JSON data is returned as an array of objects with no further nesting (with
exception of one optional property; see [additional parameters]).

[additional parameters]: #additional-parameters

<details><summary>JSON data example</summary>

```json
[
  {
    "file_url": "https://api-cdn.rule34.xxx/images/5109/0966...81e4.jpeg",
    "width": 1136,
    "height": 1250,

    "sample": false,
    "sample_url": "https://api-cdn.rule34.xxx/images/5109/0966...81e4.jpeg",
    "sample_width": 0,
    "sample_height": 0,

    "preview_url": "https://api-cdn.rule34.xxx/thumbnails/5109/thumbnail_0966...81e4.jpg",

    "id": 5823623,
    "owner": "grovyleslut",
    "parent_id": 0,
    "has_notes": false,
    "rating": "questionable",
    "tags": "1girls 2d ... white_sclera zoologist_(terraria)",
    "source": "",

    "change": 1680758419,
    "hash": "0966b7bb5f64f30010d14d5e98bb81e4",
    "directory": 5109,
    "image": "0966b7bb5f64f30010d14d5e98bb81e4.jpeg",
    "status": "active",

    "score": 399,
    "comment_count": 22,

    "tag_info": [
      { "count": 4616241, "type": "tag",       "tag": "1girls"               },
      { "count": 439311,  "type": "metadata",  "tag": "2d"                   },
      // ...
      { "count": 9314,    "type": "tag",       "tag": "white_sclera"         },
      { "count": 1138,    "type": "character", "tag": "zoologist_(terraria)" }
    ]
  }
]
```

> [!NOTE]
> The example is formatted for better readability, but the actual result is
> formatted differently.

</details>

#### Additional Parameters

When requesting data as JSON, additional parameters become allowed, which affect the returned results.

All of the following parameters are optional.

  - **`fields`**: It is uncertain what this parameter describes.
    - Values may be any of the following:
      - Absent or an empty string
      - **`tag_info`**: adds an additional `tag_info` property to each post
        object, being an array with more verbose tag objects
    > [!IMPORTANT]
    > This parameter is entirely undocumented. The only value known to be
    > allowed with this parameter, when specified, is `tag_info`.
    >
    > ```markdown
    > # TODO:
    >   - Test different values with `fields` parameter:
    >     - [x] `comment` and `comments`
    >   - Contact Rule34 developers
    > ```

### Core Differences

As XML and JSON are almost fundamentally different when it comes to storing and
serving data, there are some core differences between them that may be alike for
any API that supports both formats.

#### Values

JSON supports storing different primitive types, such as strings, numbers, and
boolean values. However, an XML element's attribute values are always strings,
so integer values are represented as numerical strings, and boolean values are
represented as `"true"` or `"false"`.

> [!NOTE]
> With that being said, from hereon, attribute values said to be _integers_ may
> be parsed as a numerical string (i.e. [the `Number` function]), and attribute
> values said to be _boolean_ may be evaluated as equal to `"true"` or not equal
> to `"false"`.

[the `Number` function]: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number>

### Faulty Differences

Regardless of the core differences between XML and JSON, there are many
server-side programmer errors that prevent parody between usage of the two
formats. Each format has some of their own exclusive properties and info, and
some values just aren't equivalently returned.

#### Table

Below is a collapsed, concise table representation of the parody between XML and
JSON posts.

<details><summary>Table of property comparisons</summary>

|                             | XML                                    | JSON                                    |
| --------------------------- | -------------------------------------- | --------------------------------------- |
| Root attributes             | :white_check_mark: `count`, `offset`   | :x: No                                  |
| `file_url`                  | :white_check_mark: Yes                 | :white_check_mark: Yes                  |
| `width`                     | :white_check_mark: Yes                 | :white_check_mark: Yes                  |
| `height`                    | :white_check_mark: Yes                 | :white_check_mark: Yes                  |
| `sample`                    | :x: No                                 | :white_check_mark: Yes                  |
| `sample_url`                | :white_check_mark: Yes                 | :white_check_mark: Yes                  |
| `sample_width`              | :white_check_mark: Yes                 | :white_check_mark: Yes                  |
| `sample_height`             | :white_check_mark: Yes                 | :white_check_mark: Yes                  |
| `sample_height`             | :white_check_mark: Yes                 | :white_check_mark: Yes                  |
| `preview_width`             | :white_check_mark: Yes                 | :x: No                                  |
| `preview_height`            | :white_check_mark: Yes                 | :x: No                                  |
| `id`                        | :white_check_mark: Yes                 | :white_check_mark: Yes                  |
| `owner`                     | :x: No                                 | :white_check_mark: Yes                  |
| `creator_id`                | :white_check_mark: Yes                 | :x: No                                  |
| `parent_id`                 | :white_check_mark: Yes                 | :white_check_mark: Yes                  |
| `has_children`              | :white_check_mark: Yes                 | :x: No                                  |
| `has_notes`                 | :white_check_mark: Yes                 | :white_check_mark: Yes                  |
| `rating`                    | :white_check_mark: Yes                 | :white_check_mark: Yes                  |
| `tags`                      | :white_check_mark: Yes                 | :white_check_mark: Yes                  |
| `source`                    | :white_check_mark: Yes                 | :white_check_mark: Yes                  |
| `created_at`                | :white_check_mark: Yes                 | :x: No                                  |
| `change`                    | :white_check_mark: Yes                 | :white_check_mark: Yes                  |
| `md5` (XML) / `hash` (JSON) | :white_check_mark: Yes (under `"md5"`) | :white_check_mark: Yes (under `"hash"`) |
| `directory`                 | :x: No                                 | :white_check_mark: Yes                  |
| `image`                     | :x: No                                 | :white_check_mark: Yes                  |
| `status`                    | :white_check_mark: Yes                 | :white_check_mark: Yes                  |
| `score`                     | :white_check_mark: Yes                 | :white_check_mark: Yes                  |
| `has_comments`              | :white_check_mark: Yes                 | :x: No                                  |
| `comment_count`             | :x: No                                 | :white_check_mark: Yes                  |

</details>

#### Root Node vs. Array

The main difference&mdash;a difference noticable even if no posts are
returned&mdash;is that XML returns root node, which can contain attributes as
well as children, and JSON only returns an array, which doesn't have attributes.

The XML root node has two useful attributes that can't be found when getting
JSON results:

  - **`count`**: The amount of _total_ posts that can be found from the search
    query
    - Integer
  - **`offset`**: The offset of the returned results in _posts;_ if the `limit`
    is 5 and the page is `2`, `offset` will be `"10"`
    - Integer

#### Mutual Values

The post objects of each format have mostly mutual properties and attributes.

_Integer_ values are presented as `number` values in JSON, and
[`Number`]-parsable strings in XML.

_Boolean_ values are presented as `boolean` values in JSON, and `"true"` or
`"false"` in XML.

Along with their descriptions, they are listed below.

  - **`file_url`**: The CDN URL of the main file
  - **`width`**: The width of the main file in pixels
    - Integer
  - **`height`**: The height of the main file in pixels
    - Integer
  - **`sample_url`**: The CDN URL of the downsampled image of the main file
  - **`sample_width`**: The width of the downsampled image in pixels
    - Integer
  - **`sample_height`**: The height of the downsampled image in pixels
    - Integer
  - **`preview_url`**: The CDN URL of a highly downsampled version of the main file
  - **`id`**: The unique id of the post
    - Integer
  - **`has_notes`**: Whether the image has notes associated
    - Always boolean
  - **`tags`**: The list of tags on the post sorted alphabetically and separated
    by a space
  - **`source`**: The string set as the source of the post
    - Can be any or empty
  - **`change`**: The Unix timestamp, in seconds, of the date the post was last
    updated
    - Integer
  - **`status`**: The visibility status of the post
    - `"active"`, `"flagged"`, or `"deleted"`
  - **`score`**: The amount of upvotes given to the post
    - Integer

Some properties are still equatable, but the way their values are returned are
different and can be considered inequivalent.

Along with their descriptions, those properties and their differences are listed
below.

  - **`parent_id`**: The id of the post set as the parent
    - Values differ when not set
  - **`rating`**: The content rating of the image
    - Possible values ("safe," "questionable," and "explicit") are represented
      differently
  - **`md5`** (XML) / **`hash`** (JSON): The MD5 hash of the post
    - Always a hexadecimal string
  
|              | XML                                                                          | JSON                                                 |
| ------------ | ---------------------------------------------------------------------------- | ---------------------------------------------------- |
| `parent_id`  | Value is an integer, unless no parent is set, to which it is an empty string | Value is `0` if no parent is set                     |
| `rating`     | Value is `"s"`, `"q"`, or `"e"`                                              | Value is `"safe"`, `"questionable"`, or `"explicit"` |
| `md5`/`hash` | Attribute name is `md5`                                                      | Key is `"hash"`                                      |

#### Exclusive values

XML posts have some notable, exclusive properties not found on JSON posts.

Along with their descriptions, they are listed below.

  - **`preview_width`**: The width of the preview image in pixels
    - Integer
  - **`preview_height`**: The height of the preview image in pixels
    - Integer
  - **`creator_id`**: The id of the creator of the post
    - Integer
  - **`has_children`**: Whether one or more posts have the post set as their
    parent
    - Boolean
  - **`created_at`**: The date of the post's creation
    - [`Date`]-parsable:
      1. Day of the week; truncated (3 letters), capital
      2. Month; truncated (3 letters), capital
      3. Day of the month; 2 padding zeros
      4. The hour, minute, and second; separated by colons, each padded with two
         zeros
      5. The timezone (always `+0100`)
      6. Year
  - **`has_comments`**: Whether this post has one or more comments
    - Boolean

[`Date`]: <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date>

Likewise to XML against JSON, vice versa applies; JSON has noteworthy exclusive
properties.

Along with their descriptions, they are listed below.

  - **`sample`**: Whether the main file is an image, and whether there is a
    resample for it
    - Boolean
  - **`owner`**: The username of the creator of the post
  - **`directory`**: The numerical directory of the post's files
    - Integer
  - **`image`**: The main file's filename; equivalent to `hash` with the file
    extension
  - **`comment_count`**: The amount of comments under the post
    - Integer

When `fields` has `tag_info`, an additional property can be found.

  - **`tag_info`**: An array of the tags&mdash;and their info&mdash;associated
    with the post
    - Array of objects:
      - **`tag`**: The name value of the tag
      - **`type`**: The tag's category
        - `"copyright"`, `"character"`, `"artist"`, `"tag"`, `"metadata"`, or
          `null`
      - **`count`**: The amount of posts that use this tag; the amount of posts
        that can be found when searching this tag
        - Integer
