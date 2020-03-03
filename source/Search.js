const Fuse = require("fuse.js");
const EventEmitter = require("eventemitter3");
const deepEqual = require("deep-equal");
const debounce = require("debounce");

/**
 * Search class for searching entries
 * @augments EventEmitter
 */
class Search extends EventEmitter {
    /**
     * Constructor for Search instances
     * @param {SearchEntry[]} entryItems Entries to search
     * @memberof Search
     */
    constructor(entryItems) {
        super();
        this._items = entryItems;
        this._cachedTerm = "";
        this._cachedFuseOpts = null;
        this._fuse = null;
        this.threshold = 0.5;
        this.distance = 75;
        /**
         * Update the search results for a query term
         * @type {Function}
         * @param {String} term The search term
         * @memberof Search
         */
        this.update = debounce(this._update.bind(this), 175);
    }

    search(term) {
        return this._getFuse().search(term);
    }

    _getFuse() {
        const fuseOptions = {
            shouldSort: true,
            threshold: this.threshold,
            location: 0,
            distance: this.distance,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
              "properties.value"
            ]
        };
        if (this._fuse && deepEqual(this._cachedFuseOpts, fuseOptions)) {
            return this._fuse;
        }
        this._cachedFuseOpts = fuseOptions;
        this._fuse = new Fuse(this._items, fuseOptions);
        return this._fuse;
    }

    _update(term) {
        const results = this._getFuse().search(term);
        this.emit("results", {
            results,
            term
        });
    }
}

module.exports = Search;
