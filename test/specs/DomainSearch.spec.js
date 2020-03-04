const { Archive } = require("buttercup");
const { extractEntriesFromArchive } = require("../../source/adapters.js");
const DomainSearch = require("../../source/DomainSearch.js");

describe("DomainSearch", function() {
    describe("DomainSearch", function() {
        beforeEach(function() {
            this.archive = new Archive();
            const main = this.archive.createGroup("Main");
            this.entry1 = main
                .createEntry("test1")
                .setProperty("username", "user1")
                .setProperty("password", "password1")
                .setProperty("E-mail", "user@hotmail.com");
            this.entry2 = main
                .createEntry("test2")
                .setProperty("username", "user2")
                .setProperty("password", "password2")
                .setProperty("Url", "http://test.com/amazing-page.php");
            this.entry3 = main
                .createEntry("test3")
                .setProperty("username", "user3")
                .setProperty("password", "password3")
                .setProperty("URL", "https://interesting.test.com/what");
            this.searchInst = new DomainSearch(extractEntriesFromArchive(this.archive));
        });

        describe("search", function() {
            it("returns expected results", function() {
                const results = this.searchInst.search("test.com");
                expect(results).to.have.lengthOf(2);
                const ids = results.map(r => r.id);
                expect(ids).to.contain(this.entry2.id);
                expect(ids).to.contain(this.entry3.id);
            });
        });

        // describe("update", function() {
        //     it("executes callback with expected results", function(done) {
        //         this.searchInst.on("results", res => {
        //             const { results, term } = res;
        //             expect(results).to.have.lengthOf(2);
        //             const ids = results.map(r => r.id);
        //             expect(ids).to.contain(this.entry2.id);
        //             expect(ids).to.contain(this.entry3.id);
        //             done();
        //         });
        //         this.searchInst.update("blue");
        //     });
        // });
    });
});
