require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import routes from "./api/routes/routes";
const { logIn, signUp } = require("./api/controllers/authController");
import process from "process";
import { MongoDB } from "./api/db/mongodb";
const logger = require("morgan");
import swaggerUI from "swagger-ui-express";
import swaggerConfig from "./api/utils/swaggerConfig";
import apicache from 'apicache'
const cache = apicache.middleware


const app = express();
const PORT = process.env.PORT || 5050;

MongoDB();

app.use(cache('5 minutes'))

app.use(logger("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(express.static("public"));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerConfig));

app.post("/register", signUp);
app.post("/login", logIn);

routes(app);

app.listen(PORT, (req, res) => console.log(`Your server is running on port ${PORT} 🚀 cache is enable for 5 mins`));

module.exports = app;
