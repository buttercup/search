const { Archive } = require("buttercup");
const { extractEntriesFromArchive } = require("../../source/adapters.js");
const Search = require("../../source/Search.js");

describe("Search", function() {
    describe("Search", function() {
        beforeEach(function() {
            this.archive = new Archive();
            const main = this.archive.createGroup("Main");
            this.entry1 = main.createEntry("test1")
                .setProperty("username", "user1")
                .setProperty("password", "password1")
                .setProperty("extra", "red");
            this.entry2 = main.createEntry("test2")
                .setProperty("username", "user2")
                .setProperty("password", "password2")
                .setProperty("extra", "blue-ish");
            this.entry3 = main.createEntry("test3")
                .setProperty("username", "user3")
                .setProperty("password", "password3")
                .setProperty("extra", "blue");
            this.searchInst = new Search(extractEntriesFromArchive(this.archive));
        });

        describe("search", function() {
            it("returns expected results", function() {
                const results = this.searchInst.search("blue");
                expect(results).to.have.lengthOf(2);
                const ids = results.map(r => r.id);
                expect(ids).to.contain(this.entry2.id);
                expect(ids).to.contain(this.entry3.id);
            });
        });

        describe("update", function() {
            it("executes callback with expected results", function(done) {
                this.searchInst.on("results", res => {
                    const { results, term } = res;
                    expect(results).to.have.lengthOf(2);
                    const ids = results.map(r => r.id);
                    expect(ids).to.contain(this.entry2.id);
                    expect(ids).to.contain(this.entry3.id);
                    done();
                });
                this.searchInst.update("blue");
            });
        });
    });
});
