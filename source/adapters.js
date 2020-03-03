/**
 * @typedef {Object} SearchEntryProperty
 * @property {String} property The entry property key
 * @property {String} value The entry property value
 */

/**
 * @typedef {Object} SearchEntry
 * @property {String} id The entry ID
 * @property {String} groupID The containing group ID
 * @property {SearchEntryProperty[]} properties Array of all entry properties
 */

/**
 * Extract all search entries from an archive
 * @param {Archive} archive Buttercup archive instance
 * @returns {SearchEntry[]} An array of search entries
 * @memberof module:ButtercupSearch
 */
function extractEntriesFromArchive(archive) {
    const entries = (function getEntries(target) {
        const base = target.getEntries ? target.getEntries() : [];
        return [
            ...base,
            ...target.getGroups().reduce(
                (output, group) => [
                    ...output,
                    ...getEntries(group)
                ],
                []
            )
        ];
    })(archive);
    return entries.map(entry => ({
        id: entry.id,
        groupID: entry.getGroup().id,
        properties: Object.keys(entry.getProperty()).map(propKey => ({
            property: propKey,
            value: entry.getProperty(propKey)
        }))
    }));
}

/**
 * Extract all search entries from an archive facade object
 * @param {Object} archive The archive facade object
 * @returns {SearchEntry[]} An array of search entries
 * @memberof module:ButtercupSearch
 */
function extractEntriesFromArchiveFacade(archive) {
    return archive.entries.map(entry => ({
        id: entry.id,
        groupID: entry.parentID,
        properties: entry.fields.map(field => ({
            property: field.property,
            value: field.value
        }))
    }));
}

module.exports = {
    extractEntriesFromArchive,
    extractEntriesFromArchiveFacade
};
