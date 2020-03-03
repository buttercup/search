# Search
> Vault searching components

[![Build Status](https://travis-ci.org/buttercup/search.svg?branch=master)](https://travis-ci.org/buttercup/search)

## About

This library provides searching utilities for finding entries in Buttercup vaults.

## Usage

Use the extraction methods to extract search targets from vaults:

```javascript
const { extractEntriesFromArchive } = require("@buttercup/search");

const searchItems = extractEntriesFromArchive(vault);
```

Or vault facades:

```javascript
const { extractEntriesFromArchiveFacade } = require("@buttercup/search");

const searchItems = extractEntriesFromArchiveFacade(vaultFacade);
```

Provide these results to the `Search` class:

```javascript
const { Search } = require("@buttercup/search");

const search = new Search(searchItems);
search.on("results", evt => {
    // evt is like:
    // {
    //     results: [],
    //     term: "some term"
    // }
});
search.update("some term");
```
