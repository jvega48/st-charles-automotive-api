## Getting Started

This is a simple API build for St Charles Automotive that uses a JWT Bearer token to authenticate the users allowing them to use the API.

```diff
- Disclaimer for demo purposes we are running the api on: http://localhost
- Using Port 4000 (change port on the env file)
+ Full api url: http://localhost:4000 
+ Full mongodb database url: mongodb://localhost:27017/booking_app_db
```

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* Please verify that node.js is install in your machine, the link below will provide a download page to let you chose the   installation package for your machine preference
  ```
    [Installation guide for node.js](https://nodejs.org/en/download/)
  ```
* MacOS Mongodb installation
  ```
    [Installation guide for mac](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

  ```
* Windows Mongodb installation
  ```
    [Installation guide for windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

  ```

### Installation

* <strong>Install app and the required packages<strong>
  ```
    npm install
  ```

### Running Mongodb before running the app or the unit test

* Windows machine
  ```
   1. Create a database directory
      -  cd C:\
      -  md "\data\db"

   2. Start the MongoDB Database
      - "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath="c:\data\db"

   3. Run the app or run the unit test
      - waiting for connections, this show that your db is running and ready to be used
  ```
* MacOS machine
  ```
   1. Create a database directory if you don't already have one
      - sudo mkdir -p /data/db

   2. Give the data directory permission
      - sudo chown -R `id -un` /data/db

   3. Run the app or run the unit test
      - brew services start mongodb

   4. Restart mongodb
      - brew services restart mongodb

   5. Restart mongodb
      - brew services restart mongodb
  ```
### How to run the app, unit test, test coverage, swagger api documentation
  ```diff
  - Disclaimer before running the unit test gracefully end the api
  ```
* <strong>Run express API</strong> :white_check_mark:
  ```
   npm run dev 
  ```
* <strong>Run unit test</strong> :white_check_mark:
  ```
    npm run test 
  ```
* <strong>Run unit test coverage</strong> :white_check_mark:
  ```
    npm run test-coverage 
  ```
* Swagger API DOCS (V1 Users only) Draft one experimental phase :construction: [API DOCS](http://localhost:4000/api-docs)

### API Token type
  ```
  In order to use the api provide an authorization bearer token
  ```

  <strong>Register to use the API Example</strong> :rocket:
  ![Registration example](https://github.com/jvega48/st-charles-automotive-api/blob/main/register.jpg)

  <strong>Login to use the API Example</strong> :airplane:
  ![Login example](https://github.com/jvega48/st-charles-automotive-api/blob/main/login.jpg) 

#### API Authentication to access the endpoints
POST - Register user to access the api
* Navigate to [http://localhost:4000/register](http://localhost:4000/register)

POST - Login with bearer token
* Navigate to [http://localhost:4000/login](http://localhost:4000/login)

#### API User endpoints
GET - Get all users and returns a list of Users (User Model)
* Navigate to [http://localhost:4000/api/v1/user](http://localhost:4000/api/v1/user)

POST - Created a new user and return the new user (User Model)
* Navigate to [http://localhost:4000/api/v1/user](http://localhost:4000/api/v1/user)

GET - Gets a user with the email provided and returns a users (User Model)
* Navigate to [http://localhost:4000/api/v1/user/email/:email](http://localhost:4000/api/v1/user/email/:email)

GET - Gets a user with the userId provided and returns a single user (User Model)
* Navigate to [http://localhost:4000/api/v1/user/:userId](http://localhost:4000/api/v1/user/:userId)

PATCH - Updates a user given a userId and returns an update user (User Model)
* Navigate to [http://localhost:4000/api/v1/user/:userId](http://localhost:4000/api/v1/user/:userId)

DELETE - Gets a user with the userId provided and object gets deleted
* Navigate to [http://localhost:4000/api/v1/user/:userId](http://localhost:4000/api/v1/user/:userId)

#### API Reservation endpoints
GET - Get all reservations and returns a list of reservation (Reservation Model)
* Navigate to [http://localhost:4000/api/v1/reservation](http://localhost:4000/api/v1/reservation)

POST - Creates a new reservation and returns a reservation (Reservation Model)
* Navigate to [http://localhost:4000/api/v1/reservation](http://localhost:4000/api/v1/reservation)

GET - Gets a single reservation with the reservationId provided and returns a reservation (Reservation Model)
* Navigate to [http://localhost:4000/api/v1/reservation/:reservationId](http://localhost:4000/api/v1/reservation/:reservationId)

PATCH - Updates a reservation with the reservationId provided and returns the update reservation (Reservation Model)
* Navigate to [http://localhost:4000/api/v1/reservation/:reservationId](http://localhost:4000/api/v1/reservation/:reservationId)

DELETE -Deletes a reservation based on the reservationId provided (Reservation Model)
* Navigate to [http://localhost:4000/api/v1/reservation/:reservationId](http://localhost:4000/api/v1/reservation/:reservationId)

PATCH - Update the status of the reservation to start based on the reservationId (Reservation Model)
* Navigate to [http://localhost:4000/api/v1/reservation/:reservationId/start](http://localhost:4000/api/v1/reservation/:reservationId/start)

PATCH - Update the status of the reservation to complete based on the reservationId (Reservation Model)
* Navigate to [http://localhost:4000/api/v1/reservation/:reservationId/complete](http://localhost:4000/api/v1/reservation/:reservationId/completet)

GET - Gets a users reservation history with the userId & reservationId provided and returns the reservation for the user (Reservation Model)
* Navigate to [http://localhost:4000/api/v1/reservation/history/:reservationId/:userId](http://localhost:4000/api/v1/reservation/history/:reservationId/:userId)


#### API Vehicle endpoints
GET - Get all vehicle and returns a list of vehicle (Vehicle Model)
* Navigate to [http://localhost:4000/api/v1/vehicle](http://localhost:4000/api/v1/vehicle)

POST - Creates a new vehicle and returns a vehicle (Vehicle Model)
* Navigate to [http://localhost:4000/api/v1/vehicle](http://localhost:4000/api/v1/vehicle)

GET - Gets a single vehicle with the vin number provided and returns a the correct car (Vehicle Model)
* Navigate to [http://localhost:4000/api/v1/vehicle/vin/:vin](http://localhost:4000/api/v1/vehicle/vin/:vin)

GET - Gets a vehicle with the vehicleId provided (Vehicle Model)
* Navigate to [http://localhost:4000/api/v1/vehicle/:vehicleId](http://localhost:4000/api/v1/vehicle/:vehicleId)

PATCH - Updates a vehicle given a vehicleId (Vehicle Model)
* Navigate to [http://localhost:4000/api/v1/vehicle/:vehicleId](http://localhost:4000/api/v1/user/:vehicleId)

DELETE - Deletes a vehicle with the vehicleId provided (Vehicle Model)
* Navigate to [http://localhost:4000/api/v1/vehicle/:vehicleId](http://localhost:4000/api/v1/vehicle/:vehicleId)

#### Bookings endpoints
GET - Get all bookings and returns a list of bookings (Bookings Model)
* Navigate to [http://localhost:4000/api/v1/bookings](http://localhost:4000/api/v1/bookings)

POST - Creates a new slots of booking availability and returns the day with booking slots (Bookings Model)
* Navigate to [http://localhost:4000/api/v1/bookings](http://localhost:4000/api/v1/bookings)

DELETE - Deletes the day ov available bookings with the bookingId provided (Bookings Model)
* Navigate to [http://localhost:4000/api/v1/bookings/:bookingId](http://localhost:4000/api/v1/bookings/:bookingId)
