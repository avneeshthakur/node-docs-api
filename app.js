const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors');
const dbUrl = process.env.DATABASE_URL || "mongodb://localhost:27017/node-docs";

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const docsRouter = require("./routes/docs");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Configuration and connecting to Databse MongoDb
mongoose.connect(
  dbUrl,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) {
      console.log("Connection Error: ", err);
    } else {
      console.log("Successfully Connected");
    }
  }
);

mongoose.Promise = global.Promise;

app.use("/api", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/docs", docsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
