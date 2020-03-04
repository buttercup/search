const extractDomain = require("extract-domain");
const {
    tools: { entry: ButtercupEntryTools }
} = require("buttercup");
const Search = require("./Search.js");

const { ENTRY_URL_TYPE_GENERAL, getEntryURLs } = ButtercupEntryTools;

const ADDITIONAL_PROPERTIES = /e-?mail/i;

function extractDomainFromURL(url) {
    try {
        return extractDomain(url);
    } catch (err) {
        return null;
    }
}

/**
 * Search class for searching entries by domain
 * @augments Search
 * @memberof module:ButtercupSearch
 */
class DomainSearch extends Search {
    /**
     * Search for entries by a domain
     * @param {String} domain The domain name (not URL)
     * @returns {Array.<SearchEntry>}
     * @memberof DomainSearch
     */
    search(domain) {
        const normalisedDomain = domain.toLowerCase();
        return this.items.filter(item => {
            const props = item.properties.reduce(
                (output, prop) =>
                    Object.assign(output, {
                        [prop.property.toLowerCase()]: prop.value
                    }),
                {}
            );
            const urls = [
                ...getEntryURLs(props, ENTRY_URL_TYPE_GENERAL),
                ...item.properties.reduce((extraURLs, prop) => {
                    if (ADDITIONAL_PROPERTIES.test(prop.property)) {
                        extraURLs.push(prop.value);
                    }
                    return extraURLs;
                }, [])
            ];
            return urls.some(url => {
                const uDomain = extractDomainFromURL(url);
                return uDomain && uDomain.toLowerCase() === normalisedDomain;
            });
        });
    }
}

module.exports = DomainSearch;
