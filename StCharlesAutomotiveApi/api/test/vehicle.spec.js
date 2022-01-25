let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../server");
let should = chai.should();

chai.use(chaiHttp);

let AuthToken = null;
let token = null;
let vehicleId = null;
let apiUser = null;
let vin = null;
describe("-------------Vehicle unit tests-------------", () => {
  before((done) => {
    chai
      .request(server)
      .post("/register")
      .type("json")
      .send({
        email: "testvehicle@gmail.com",
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
        email: "testvehicle@gmail.com",
        password: "testpass1",
      })
      .end((err, res) => {
        apiUser = res.body.data._id;
        token = res.body.data.token;
        done();
      });
  });

  describe("/POST Vehicles", () => {
    it("it should create a new vehicle success", (done) => {
      chai
        .request(server)
        .post("/api/v1/vehicle")
        .set({ Authorization: `Bearer ${token}` })
        .send({
          make: "toyota",
          model: "previa",
          trim: "",
          year: 1999,
          licensePlate: "59402w2",
          vinNumber: "FFHEUWFWEJfrewd",
          color: "Black",
          miles: 100000,
          previousHistory: [{}],
        })
        .end((err, res) => {
          vehicleId = res.body.data._id;
          vin = res.body.data.vinNumber;
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/POST Vehicles", () => {
    it("it should fail when creating the same vehicle with the vin number", (done) => {
      chai
        .request(server)
        .post("/api/v1/vehicle")
        .set({ Authorization: `Bearer ${token}` })
        .send({
          make: "toyota",
          model: "previa",
          trim: "",
          year: 1999,
          licensePlate: "59402S2",
          vinNumber: "FFHEUWFWEJfrewd",
          color: "Black",
          miles: 100000,
          previousHistory: [{}],
        })
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/POST Vehicles", () => {
    it("it should fail when creating the same vehicle with the different vin but same license plate", (done) => {
      chai
        .request(server)
        .post("/api/v1/vehicle")
        .set({ Authorization: `Bearer ${token}` })
        .send({
          make: "toyota",
          model: "previa",
          trim: "",
          year: 1999,
          licensePlate: "59402w2",
          vinNumber: "FFHEUWFWEJfraswd",
          color: "Black",
          miles: 100000,
          previousHistory: [{}],
        })
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a("object");
          done();
        });
    });
  });
  describe("/GET Vehicles", () => {
    it("it should GET all the vehicle success", (done) => {
      chai
        .request(server)
        .get("/api/v1/vehicle")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/GET Vehicles", () => {
    it("it should GET a single vehicle success", (done) => {
      chai
        .request(server)
        .get(`/api/v1/vehicle/${vehicleId}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/GET Vehicles", () => {
    it("it should GET a single vehicle with the vin number success", (done) => {
      chai
        .request(server)
        .get(`/api/v1/vehicle/vin/${vin}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/PATCH vehicle", () => {
    it("it should update a single vehicle", (done) => {
      chai
        .request(server)
        .patch(`/api/v1/vehicle/${vehicleId}`)
        .set({ Authorization: `Bearer ${token}` })
        .send({ year: 1994, color: "Pink" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/DELETE vehicle", () => {
    it("it should delete a single vehicle", (done) => {
      chai
        .request(server)
        .delete(`/api/v1/vehicle/${vehicleId}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/DELETE user", () => {
    it("it should delete the api user", (done) => {
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
