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

function extractEntriesFromArchiveFacade(archive) {
    return archive.entries.map(entry => ({
        id: entry.id,
        groupID: entry.parentID,
        properties: entry.fields.map(field => ({
                property: field.property,
                value: field.value
        }))
        // properties: entry.fields.reduce((output, field) => {
        //     if (field.propertyType === "property") {
        //         Object.assign(output, {
        //             [field.property]: field.value
        //         });
        //     }
        //     return output;
        // }, {})
    }));
}

module.exports = {
    extractEntriesFromArchive,
    extractEntriesFromArchiveFacade
};
