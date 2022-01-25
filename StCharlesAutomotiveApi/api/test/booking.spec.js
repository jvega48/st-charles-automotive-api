let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../server");
let should = chai.should();

chai.use(chaiHttp);

let AuthToken = null;
let token = null;
let bookingId = null;
let apiUser = null;
describe("----------Booking api unit tests----------", () => {
  before((done) => {
    chai
      .request(server)
      .post("/register")
      .type("json")
      .send({
        email: "bookingtest@gmail.com",
        password: "bookingtestapi",
      })
      .end((err, res) => {
        AuthToken = res.body.data.authToken;
        res.should.have.status(200);
        done();
      });
  });

  beforeEach((done) => {
    chai
      .request(server)
      .post("/login")
      .set({ Authorization: `Bearer ${AuthToken}` })
      .send({
        email: "bookingtest@gmail.com",
        password: "bookingtestapi",
      })
      .end((err, res) => {
        token = res.body.data.token;
        apiUser = res.body.data._id;
        res.should.have.status(200);
        done();
      });
  });

  describe("/POST Booking", () => {
    it("it should post a set of time slots for a single day", (done) => {
      chai
        .request(server)
        .post("/api/v1/bookings")
        .set({ Authorization: `Bearer ${token}` })
        .send({
          date: "2020-03-10",
          timeSlots: [
            {
              slot: "2020-03-09 11:00:00",
              isBooked: false,
            },
            {
              slot: "2020-03-08 14:00:00",
              isBooked: false,
            },
          ],
        })
        .end((err, res) => {
          bookingId = res.body.data._id;
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/GET bookings", () => {
    it("it should GET all the bookings available and unavailable", (done) => {
      chai
        .request(server)
        .get("/api/v1/bookings")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/DELETE api booking user", () => {
    it("it should delete bookings", (done) => {
      chai
        .request(server)
        .del(`/api/v1/bookings/${bookingId}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
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
