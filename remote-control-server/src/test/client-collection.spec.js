const expect = require("chai").expect;

const ClientCollection = require("../client-collection");


describe("client-collection", () => {
    it("should be able to call as constructort", () => {
        const clientCollection = new ClientCollection();
        expect(clientCollection).to.have.property("add");
        expect(clientCollection).to.have.property("getAll");
        expect(clientCollection).to.have.property("get");
    });
});
