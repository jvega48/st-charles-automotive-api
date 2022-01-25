const { addNewUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getUserById,
    getUserByEmail
} = require('../controllers/userController');

const {
    addNewReservation,
    getAllReservations,
    getUserReservationsByUserId,
    getUserReservationsByReservationId,
    deleteUserReservationByReservationId,
    updateUserReservationByReservationId,
    startReservationByReservationId,
    completeReservationByReservationId,
    getUserReservationHistory
} = require('../controllers/reservationController');

const {
    addNewVehicle,
    getAllVehicles,
    updateVehicle,
    deleteVehicle,
    getVehicleByVin,
    getVehicleById,
} = require('../controllers/vehicleController');

const {
    addNewBookingSlots,
    getAllBookings,
    deleteBookingById
} = require('../controllers/bookingController');

const { verifyToken } = require('../middleware/authCheck');
const apiV1 = '/api/v1'

const routes = (app) => {

    app
      .use(verifyToken)
      .route(apiV1 + "/user")
      .post(addNewUser)
      .get(getAllUsers);

    app
      .use(verifyToken)
      .route(apiV1 + "/user/email/:email")
      .get(getUserByEmail);

    app
      .use(verifyToken)
      .route(apiV1 + "/user/:userId")
      .patch(updateUser)
      .get(getUserById)
      .delete(deleteUser);

    app
      .use(verifyToken)
      .route(apiV1 + "/reservation")
      .post(addNewReservation)
      .get(getAllReservations);

    app
      .use(verifyToken)
      .route(apiV1 + "/reservation/:reservationId")
      .get(getUserReservationsByReservationId)
      .patch(updateUserReservationByReservationId)
      .delete(deleteUserReservationByReservationId);

    app
      .use(verifyToken)
      .route(apiV1 + "/reservation/:reservationId/start")
      .patch(startReservationByReservationId);

    app
      .use(verifyToken)
      .route(apiV1 + "/reservation/:reservationId/complete")
      .patch(completeReservationByReservationId);

    app
      .use(verifyToken)
      .route(apiV1 + "/reservation/user/:userId")
      .get(getUserReservationsByUserId);

    app
      .route(apiV1 + "/reservation/history/:reservationId/:userId")
      .get(getUserReservationHistory);

    app
      .use(verifyToken)
      .route(apiV1 + "/vehicle")
      .post(addNewVehicle)
      .get(getAllVehicles);

    app
      .use(verifyToken)
      .route(apiV1 + "/vehicle/vin/:vin")
      .get(getVehicleByVin);

    app
      .use(verifyToken)
      .route(apiV1 + "/vehicle/:vehicleId")
      .get(getVehicleById)
      .patch(updateVehicle)
      .delete(deleteVehicle);

    app
      .use(verifyToken)
      .route(apiV1 + "/bookings")
      .get(getAllBookings)
      .post(addNewBookingSlots);

    app
      .use(verifyToken)
      .route(apiV1+"/bookings/:bookingId")
      .delete(deleteBookingById);
}

export default routes;