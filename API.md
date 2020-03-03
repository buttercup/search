## Modules

<dl>
<dt><a href="#module_ButtercupSearch">ButtercupSearch</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#SearchEntryProperty">SearchEntryProperty</a> : <code>Object</code></dt>
<dd></dd>
<dt><a href="#SearchEntry">SearchEntry</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="module_ButtercupSearch"></a>

## ButtercupSearch

* [ButtercupSearch](#module_ButtercupSearch)
    * [.Search](#module_ButtercupSearch.Search) ⇐ <code>EventEmitter</code>
        * [new Search(entryItems)](#new_module_ButtercupSearch.Search_new)
    * [.extractEntriesFromArchive(archive)](#module_ButtercupSearch.extractEntriesFromArchive) ⇒ [<code>Array.&lt;SearchEntry&gt;</code>](#SearchEntry)
    * [.extractEntriesFromArchiveFacade(archive)](#module_ButtercupSearch.extractEntriesFromArchiveFacade) ⇒ [<code>Array.&lt;SearchEntry&gt;</code>](#SearchEntry)

<a name="module_ButtercupSearch.Search"></a>

### ButtercupSearch.Search ⇐ <code>EventEmitter</code>
Search class for searching entries

**Kind**: static class of [<code>ButtercupSearch</code>](#module_ButtercupSearch)  
**Extends**: <code>EventEmitter</code>  
<a name="new_module_ButtercupSearch.Search_new"></a>

#### new Search(entryItems)
Constructor for Search instances


| Param | Type | Description |
| --- | --- | --- |
| entryItems | [<code>Array.&lt;SearchEntry&gt;</code>](#SearchEntry) | Entries to search |

<a name="module_ButtercupSearch.extractEntriesFromArchive"></a>

### ButtercupSearch.extractEntriesFromArchive(archive) ⇒ [<code>Array.&lt;SearchEntry&gt;</code>](#SearchEntry)
Extract all search entries from an archive

**Kind**: static method of [<code>ButtercupSearch</code>](#module_ButtercupSearch)  
**Returns**: [<code>Array.&lt;SearchEntry&gt;</code>](#SearchEntry) - An array of search entries  

| Param | Type | Description |
| --- | --- | --- |
| archive | <code>Archive</code> | Buttercup archive instance |

<a name="module_ButtercupSearch.extractEntriesFromArchiveFacade"></a>

### ButtercupSearch.extractEntriesFromArchiveFacade(archive) ⇒ [<code>Array.&lt;SearchEntry&gt;</code>](#SearchEntry)
Extract all search entries from an archive facade object

**Kind**: static method of [<code>ButtercupSearch</code>](#module_ButtercupSearch)  
**Returns**: [<code>Array.&lt;SearchEntry&gt;</code>](#SearchEntry) - An array of search entries  

| Param | Type | Description |
| --- | --- | --- |
| archive | <code>Object</code> | The archive facade object |

<a name="SearchEntryProperty"></a>

## SearchEntryProperty : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| property | <code>String</code> | The entry property key |
| value | <code>String</code> | The entry property value |

<a name="SearchEntry"></a>

## SearchEntry : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | The entry ID |
| groupID | <code>String</code> | The containing group ID |
| properties | [<code>Array.&lt;SearchEntryProperty&gt;</code>](#SearchEntryProperty) | Array of all entry properties |

