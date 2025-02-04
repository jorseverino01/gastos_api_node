const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

//Setings
app.set("port", 5000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const corsOptions = {
  origin: "https://www.desarrolladorweb.site/appGastos/",
  optionsSuccessStatus: 200,
};

//Middelwares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(express.json());

//Routes
app.use(require("./routes/index"));

//Statics
app.use(express.static(path.join(__dirname, "public")));

//404 handler
app.use((req, res, next) => {
  res.status(404).send("404 not found");
});

module.exports = app;
