let User = require("../models/user");
let mongoose = require("mongoose");
import { VehicleSchema } from "../models/vehicle";

const Vehicle = mongoose.model("Vehicle", VehicleSchema);
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../server");
const { expect } = require("chai");
let should = chai.should();

chai.use(chaiHttp);

let AuthToken = null;
let token = null;
let apiUser = null;
describe("----------Auth api unit tests----------", () => {
  describe("/POST register unsuccessful", () => {
    it("it should fail and not register a new user to use the api", (done) => {
      chai
        .request(server)
        .post("/register")
        .type("json")
        .send({
          email: "",
          password: "testing1",
        })
        .end((err, res, body) => {
          res.should.have.status(400);
          done();
        });
    });
  });

  describe("/POST register", () => {
    it("it should register a new user to use api success", (done) => {
      chai
        .request(server)
        .post("/register")
        .type("json")
        .send({
          email: "testing@gmail.com",
          password: "testing1",
        })
        .end((err, res, body) => {
          AuthToken = res.body.data.authToken;
          res.should.have.status(200);
          done();
        });
    });
  });

    describe("/POST Auth login ", () => {
      it("it should log in the api user", (done) => {
        chai
        .request(server)
        .post("/login")
        .set({"Authorization": `Bearer ${AuthToken}`})
        .send({
          email: "testing@gmail.com",
          password: "testing1",
        })
        .end((err, res) => {
          token = res.body.data.token;
          apiUser = res.body.data._id;
          res.should.have.status(200);
          done();
        });
    });
  })

  describe("/POST Auth login ", () => {
    it("it should fail because user does not exist", (done) => {
      chai
      .request(server)
      .post("/login")
      .set({"Authorization": `Bearer ${token}`})
      .send({
        email: "failed_email@gmail.com",
        password: "failpassword",
      })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
})

  describe("/POST register", () => {
    it("it should register the same user twice to use api and fail", (done) => {
      chai
        .request(server)
        .post("/register")
        .type("json")
        .send({
          email: "testing@gmail.com",
          password: "testing1",
        })
        .end((err, res, body) => {
          res.should.have.status(409);
          done();
        });
    });
  });



    describe("/GET Auth User", () => {
      it("it should failed from wrong password", (done) => {
        chai
          .request(server)
          .post("/login")
          .set({"Authorization": `Bearer ${token}`})
          .send({
            email: "testing@gmail.com",
            password: "wrongpassword",
          })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    describe("/GET Auth User", () => {
      it("it should failed from no email", (done) => {
        chai
          .request(server)
          .post("/login")
          .set({"Authorization": `Bearer ${token}`})
          .send({
            email: "",
            password: "wrongpassword",
          })
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a("object");
            done();
          });
      });
    });

    describe("/GET user", () => {
      it("it should delete authenticate api user", (done) => {
        chai
          .request(server)
          .del(`/api/v1/user/${apiUser}`)
          .set({"Authorization": `Bearer ${token}`})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
          });
      });
    });
});
