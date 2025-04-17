var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const history = require("connect-history-api-fallback");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(history());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use((err, req, res, next) => {
  const { message, statusCode, isOperational } = err;
  if (!isOperational)
    return res.status(500).json({ message: "發生未知錯誤請聯絡管理員" });
  res.status(statusCode).json({ message });
});

module.exports = app;
