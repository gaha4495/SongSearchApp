// Imports the server.js file to be tested.
const server = require("../server");
// Assertion (Test Driven Development) and Should,  Expect(Behaviour driven 
// development) library
const chai = require("chai");
// Chai HTTP provides an interface for live integration testing of the API's.
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const { assert, expect } = chai;

  //TEST 1
  describe("Id Test", () => {
    it("Verifies id properties", done => {
      chai
        .request(server)
        .get("/searches/1")
        .end((err, res) => {
          console.log(res.body);
          assert.strictEqual(res.body.id, 1);
          expect(res.body).to.have.property('nameAlt');
          expect(res.body).to.have.property('genre');
          done();
        });
      });
    });

    //Test 2
    describe("Id -Test", () => {
      it("Catches incorrect id properties", done => {
        chai
          .request(server)
          .get("/searches/-1")
          .send({id: -1})
          .end((err, res) => {
            console.log(res.body);
            expect(res).to.have.status(404);
            assert.notEqual(0);
            done();
          });
        });
      });





