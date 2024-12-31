/* global require */
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");
module.exports.bcrypt = bcrypt;

const { sequelize } = require("./models");
const config = require("./config/config.js");
const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/", express.static(path.join(__dirname, "../../vue-client/dist")));
app.use(
  "*/app/uploads/*",
  express.static(path.join(__dirname, "../../uploads/"))
);

require("./JobSeekerPassport");
require("./EmployerPassport");
require("../src/routes/routes.js")(app, express);

app.set("port", config.port);

try {
  sequelize.sync().then(() => {
    app.listen(`${config.host}:${config.port}`, () =>
      console.log(`App listening on port ${config.port}!`)
    );
  });
} catch (err) {
  console.log(`${err}`);
}
