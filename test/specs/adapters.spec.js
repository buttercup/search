const { Archive } = require("buttercup");
const { createArchiveFacade } = require("@buttercup/facades");
const { extractEntriesFromArchive, extractEntriesFromArchiveFacade } = require("../../source/adapters.js");

describe("adapters", function() {
    beforeEach(function() {
        this.archive = new Archive();
        const main = this.archive.createGroup("Main");
        this.entry1 = main.createEntry("test1")
            .setProperty("username", "user1")
            .setProperty("password", "password1");
        this.entry2 = main.createEntry("test2")
            .setProperty("username", "user2")
            .setProperty("password", "password2");
    });

    describe("extractEntriesFromArchive", function() {
        it("returns correct entries", function() {
            const items = extractEntriesFromArchive(this.archive);
            expect(items).to.have.lengthOf(2);
            const item1 = items.find(item =>
                !!item.properties.find(prop =>
                    prop.property === "username" && prop.value === "user1"
                )
            );
            const item2 = items.find(item =>
                !!item.properties.find(prop =>
                    prop.property === "username" && prop.value === "user2"
                )
            );
            expect(item1).to.have.property("id", this.entry1.id);
            expect(item2).to.have.property("id", this.entry2.id);
        });
    });

    describe("extractEntriesFromArchiveFacade", function() {
        beforeEach(function() {
            this.facade = createArchiveFacade(this.archive);
        });

        it("returns correct entries", function() {
            const items = extractEntriesFromArchiveFacade(this.facade);
            expect(items).to.have.lengthOf(2);
            const item1 = items.find(item =>
                !!item.properties.find(prop =>
                    prop.property === "username" && prop.value === "user1"
                )
            );
            const item2 = items.find(item =>
                !!item.properties.find(prop =>
                    prop.property === "username" && prop.value === "user2"
                )
            );
            expect(item1).to.have.property("id", this.entry1.id);
            expect(item2).to.have.property("id", this.entry2.id);
        });
    });
});
