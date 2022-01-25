import { assert } from "chai";
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../server");
let should = chai.should();

chai.use(chaiHttp);

let AuthToken = null;
let token = null;
let apiUser = null;
let user = null;
let email = null;
let emptyId = null;
describe("----------Users api unit tests----------", () => {
  before((done) => {
    chai
      .request(server)
      .post("/register")
      .type("json")
      .send({
        email: "test@gmail.com",
        password: "testpass1",
      })
      .end((err, res) => {
        AuthToken = res.body.data.authToken;
        res.should.have.status(200);
        done();
      });
  });

  before((done) => {
    chai
      .request(server)
      .post("/login")
      .set({ Authorization: `Bearer ${AuthToken}` })
      .send({
        email: "test@gmail.com",
        password: "testpass1",
      })
      .end((err, res, body) => {
        apiUser = res.body.data._id;
        token = res.body.data.token;
        done();
      });
  });

  describe("/POST User", () => {
    it("it should create a new users", (done) => {
      chai
        .request(server)
        .post("/api/v1/user")
        .set({ Authorization: `Bearer ${token}` })
        .send({
          firstName: "Tom",
          lastName: "The Cat",
          email: "tomthecar@gmail.com",
          password: "tomthecat",
        })
        .end((err, res) => {
          user = res.body.data._id;
          email = res.body.data.email;
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/POST User", () => {
    it("it should fail when create a the same user twice", (done) => {
      chai
        .request(server)
        .post("/api/v1/user")
        .set({ Authorization: `Bearer ${token}` })
        .send({
          firstName: "Tom",
          lastName: "The Cat",
          email: "tomthecar@gmail.com",
          password: "tomthecat",
        })
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/GET user", () => {
    it("it should fail when getting a single user and no user id provided", (done) => {
      chai
        .request(server)
        .get(`/api/v1/user/${emptyId}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/GET User", () => {
    it("it should GET all the users", (done) => {
      chai
        .request(server)
        .get("/api/v1/user")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          email = res.body.data[0].email;
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/GET user", () => {
    it("it should GET a single user", (done) => {
      chai
        .request(server)
        .get(`/api/v1/user/${user}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/GET user", () => {
    it("it should GET a single user by email", (done) => {
      chai
        .request(server)
        .get(`/api/v1/user/email/${email}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/PATCH user", () => {
    it("it should update a single user", (done) => {
      chai
        .request(server)
        .patch(`/api/v1/user/${user}`)
        .set({ Authorization: `Bearer ${token}` })
        .send({ lastName: "Tommy" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/DELETE user", () => {
    it("it should delete one user", (done) => {
      chai
        .request(server)
        .del(`/api/v1/user/${user}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/DELETE user", () => {
    it("it should fail because no user id is passed to be deleted", (done) => {
      chai
        .request(server)
        .del(`/api/v1/user/${emptyId}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          done();
        });
    });
  });
  describe("/DELETE user", () => {
    it("it should delete authenticate api user", (done) => {
      chai
        .request(server)
        .del(`/api/v1/user/${apiUser}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
