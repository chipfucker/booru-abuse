Booru Abuse _(abbreviation suggestions requested&mdash;my personal submission is 'BBUSE')_ is an NPM package intent on fleshing out what could be the REST API of each applied booru or imageboard.

> [!NOTE]
> Currently, anything and probably everything on this wiki is merely conceptualized. Things you find may be inaccurate or yet to be tangible.

## Features

The main appetizer is that it nabs exclusive info from _every_ source possible and applicable, including the front-end pages themselves.

This creates a lot of complications, as some resources provide more flexibility than others. For example, Rule34's APIs allow for a custom amount of results at once, along with a page index that offsets based on the custom amount, while the front end page only allows 42 results at a time&mdash;only less if the current page's results don't meet that number&mdash;and the 'page ID' is a _post_ offset, meaning to access page two of a search with more than 42 results, the 'page ID' should be 42.
