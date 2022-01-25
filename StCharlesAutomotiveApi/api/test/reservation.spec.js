let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../server");
let should = chai.should();

chai.use(chaiHttp);

let AuthToken = null;
let token = null;
let apiUser = null;
let vehicleId = null;
let bookingId = null;
let timeSlotId = null;
let reservationId = null;
let vin = null;
let licensePlate = null;
describe("----------Reservation api unit tests----------", () => {
  before((done) => {
    chai
      .request(server)
      .post("/register")
      .type("json")
      .send({
        email: "reservation_test@gmail.com",
        password: "reservationtestpass",
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
        email: "reservation_test@gmail.com",
        password: "reservationtestpass",
      })
      .end((err, res, body) => {
        apiUser = res.body.data._id;
        token = res.body.data.token;
        done();
      });
  });

  describe("/POST Bookings", () => {
    it("it should create a new bookings and grab the first time lot", (done) => {
      chai
        .request(server)
        .post("/api/v1/bookings")
        .set({ Authorization: `Bearer ${token}` })
        .send({
          date: "2020-03-08",
          timeSlots: [
            {
              slot: "2020-03-08 21:00:00",
              isBooked: false,
            },
            {
              slot: "2020-03-08 13:00:00",
              isBooked: false,
            },
          ],
        })
        .end((err, res) => {
          bookingId = res.body.data._id;
          timeSlotId = res.body.data.timeSlots[0]._id;
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/POST Vehicles", () => {
    it("it should create a new vehicle to be added to the reservation", (done) => {
      chai
        .request(server)
        .post("/api/v1/vehicle")
        .set({ Authorization: `Bearer ${token}` })
        .send({
          make: "DODGE",
          model: "RAM",
          trim: "",
          year: 1999,
          licensePlate: "59402S2",
          vinNumber: "FFHEUWFWEJfrewd",
          color: "Black",
          miles: 100000,
          previousHistory: [{}],
        })
        .end((err, res) => {
          vehicleId = res.body.data._id;
          vin = res.body.data.vinNumber;
          licensePlate = res.body.data.licensePlate;
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/POST Reservation", () => {
    it("it should create a new reservation", (done) => {
      chai
        .request(server)
        .post("/api/v1/reservation")
        .set({ Authorization: `Bearer ${token}` })
        .send({
          user: apiUser,
          phoneNumber: "345-454-5345",
          email: "reservation_test@gmail.com",
          bookingId: bookingId,
          timeSlotId: timeSlotId,
          vehicleId: vehicleId,
          isComplete: false,
          isBeingWorkedOn: false,
          notes: "oil change",
          priority: "low",
          licensePlate: licensePlate,
        })
        .end((err, res) => {
          reservationId = res.body.data._id;
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/GET reservation", () => {
    it("it should get all reservations", (done) => {
      chai
        .request(server)
        .get(`/api/v1/reservation`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/GET reservation", () => {
    it("it should get one reservations", (done) => {
      chai
        .request(server)
        .get(`/api/v1/reservation/${reservationId}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/GET reservation", () => {
    it("it should get one reservations history", (done) => {
      chai
        .request(server)
        .get(`/api/v1/reservation/history/${reservationId}/${apiUser}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/PATCH reservation", () => {
    it("it should update one reservations", (done) => {
      chai
        .request(server)
        .patch(`/api/v1/reservation/${reservationId}`)
        .set({ Authorization: `Bearer ${token}` })
        .send({ phoneNumber: "111-111-1111" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/PATCH reservation", () => {
    it("it should update status of the reservation", (done) => {
      chai
        .request(server)
        .patch(`/api/v1/reservation/${reservationId}/start`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/PATCH reservation", () => {
    it("it should update status of the reservation", (done) => {
      chai
        .request(server)
        .patch(`/api/v1/reservation/${reservationId}/complete`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/GET reservation", () => {
    it("it should update status of the reservation", (done) => {
      chai
        .request(server)
        .get(`/api/v1/reservation/user/${apiUser}`)
        .set({ Authorization: `Bearer ${token}` })
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

  describe("/DELETE bookings", () => {
    it("it should delete a single booking entry", (done) => {
      chai
        .request(server)
        .delete(`/api/v1/bookings/${bookingId}`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("/DELETE reservation", () => {
    it("it should delete a single reservation entry", (done) => {
      chai
        .request(server)
        .delete(`/api/v1/reservation/${reservationId}`)
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
