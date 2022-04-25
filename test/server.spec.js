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

describe("Server!", () => {
  // Sample test case given to test / endpoint.
  it("Returns the default welcome message", (done) => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        assert.strictEqual(res.body.message, "Welcome!");
        done();
      });
  });
});

  //TEST 1 
  describe("Submission Test", () => {
    it("Checks if submission is valid input", done => {
      chai
        .request(server)
        .get("/operations")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.val).to.equals('A NORMAL STRING');
          assert.notEqual(0);
          done();
        });
    });
  });

  //TEST 2
  describe("Operations id Test", () => {
    it("Verifies id properties", done => {
      chai
        .request(server)
        .get("/operations/1")
        .end((err, res) => {
          console.log(res.body);
          //expect(res.body).should.have.property('id');
          //expect(res.body.id).should.equals(1);
          assert.strictEqual(res.body.id, 1);
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('sign');
          done();
        });
      });
    });

    //TEST 3
    describe("New Operation Validity", () => {
      it("Verifies if added operation has appropriate prop's", (done) => {
        chai
          .request(server)
          .post('/operations')
          .send({name: "modulo", sign: "%"})
          .end((err, res) => {
            assert.strictEqual(res.body.id, 4);
            expect(res.body).to.have.property('name');
            expect(res.body).to.have.property('sign');
            done();
          });
      });
    });

  // ===========================================================================
  // TODO: Please add your test cases for part B here.

    // app.get("/players") test

    // app.get("/players/:id") POSITIVE Test
    describe("Player id +Test", () => {
      it("Verifies id properties", done => {
        chai
          .request(server)
          .get("/players/1")
          .end((err, res) => {
            assert.strictEqual(res.body.id, 1);
            expect(res.body).to.have.property('name');
            expect(res.body).to.have.property('dob');
            done();
          });
        });
      });

    // app.get("/players/:id") NEGATIVE Test
    describe("Player id -Test", () => {
      it("Catches incorrect id properties", done => {
        chai
          .request(server)
          .get("/players/-1")
          .send({id: -1})
          .end((err, res) => {
            console.log(res.body);
            expect(res).to.have.status(400);
            assert.notEqual(0);
            done();
          });
        });
      });


    // app.post("/players/add") POSITIVE test
    describe("New Player Validity +Test", () => {
      it("Verifies if added player has appropriate prop's", (done) => {
        chai
          .request(server)
          .post('/players/add')
          .send({name: "Levonte David", dob: "1990-01-23"}) //check if valid id, otherwise return err
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('message').equals('Success');
            done();
          });
      });
    });

    // app.post("/players/add") NEGATIVE test -- input wrong prop's
    describe("New Player Validity -Test", () => {
      it("Catches incorrect player prop's", (done) => {
        chai
          .request(server)
          .post('/players/add')
          .send({id: -2, name: -2, dob: -2})
          .end((err, res) => { //return json, check if invalid input
            expect(res).to.have.status(400); //passing, but not returning error messages to console
            done();
          });
      });
    });





