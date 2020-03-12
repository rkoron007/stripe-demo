process.env.NODE_ENV = "test";
let server = require("../server/server");

let mongoose = require("mongoose");
let Item = require("../server/models/item");

let chai = require("chai");
let chaiHttp = require("chai-http");
let expect = chai.expect;
chai.use(chaiHttp);

describe("Items", () => {
  describe("/GET items", () => {
    it("should return an array of items", done => {
      chai
        .request(server)
        .get("/api/items")
        .end((err, res) => {
          expect(res.status).to.eql(200);
          expect(res.body).to.be.a("array");

          done();
        });
    });
  });

  describe("/POST item", () => {
    it("it should not POST a item without a name", done => {
      let item = {
        price: 5,
        description: "yummy in your tummy!"
      };

      chai
        .request(server)
        .post("/api/items")
        .send(item)
        .end((err, res) => {
          expect(res.status).to.eql(200);
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.property("errors");

          done();
        });
    });
  });
});
