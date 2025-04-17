require("dotenv").config();
const express = require("express");

const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { createGCPMysqlPool, closeGCPPool } = require("./service/cloudSql");
const history = require("connect-history-api-fallback");
const indexRouter = require("./routes/index");
const memberRouter = require("./routes/member");
const stationRouter = require("./routes/station");
const biketestRouter = require("./routes/biketest");
const { editgcpdata } = require("./service/GCPtoMysql");

const app = express();

// mysql start
createGCPMysqlPool();
// 在应用程序关闭时关闭连接池
process.on("exit", () => {
  console.log("Application is exiting. Closing the database connection pool.");
  closeGCPPool();
});

// 处理 SIGINT 信号
process.on("SIGINT", () => {
  console.log("Received SIGINT signal. Closing the database connection pool.");
  closeGCPPool();
  process.exit(0);
});

// 处理其他关闭信号，例如 SIGTERM
process.on("SIGTERM", () => {
  console.log("Received SIGTERM signal. Closing the database connection pool.");
  closeGCPPool();
  process.exit(0);
});
// mysql end

editgcpdata();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(history());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/member", memberRouter);
app.use("/station", stationRouter);
app.use("/biketest", biketestRouter);
app.use((err, req, res, next) => {
  const { message, statusCode, isOperational } = err;
  if (!isOperational)
    return res.status(500).json({ message: "發生未知錯誤請聯絡管理員" });
  res.status(statusCode).json({ message });
});

module.exports = app;
