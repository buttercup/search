const EventEmitter = require("events");
const deepEqual = require("deep-equal");

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
        this._items = entryItems;
        this._cachedTerm = "";
        this._cachedFuseOpts = null;
        this._fuse = null;
        this.threshold = 0.5;
        this.distance = 75;
    }

    search(term) {
        return this._getFuse().search(term);
    }

    update(term) {
        this._cachedTerm = term;
        if (this._updateTimer) {
            return;
        }
        this._updateTimer = setTimeout(() => {
            this._updateTimer = null;
            const results = this.search(this._cachedTerm);
            this.emit("results", {
                results,
                term
            });
        }, 175);
        return () => {
            clearTimeout(this._updateTimer);
        };
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
}

module.exports = Search;
