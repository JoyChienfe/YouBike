require("dotenv").config({ path: "../.env" });
const express = require("express");
const path = require("path");
const fs = require("fs");
const mysql = require("mysql2/promise");
const ssl = {
  rejectUnauthorized: false,
  key: fs
    .readFileSync(path.join(__dirname, "../cloudsql/client-key.pem"))
    .toString(),
  cert: fs
    .readFileSync(path.join(__dirname, "../cloudsql/client-cert.pem"))
    .toString(),
  ca: fs
    .readFileSync(path.join(__dirname, "../cloudsql/server-ca.pem"))
    .toString(),
};

let pool = null;
//連接
const createGCPMysqlPool = () => {
  pool = mysql.createPool({
    host: process.env["GCP_MYSQL_HOST"],
    user: process.env["GCP_MYSQL_USER"],
    password: process.env["GCP_MYSQL_PASSWORD"],
    port: process.env["GCP_MYSQL_PORT"],
    ssl,
    database: process.env["GCP_MYSQL_DATABASE"],
  });
};

//使用
const useGCPMysql = async (query, parm) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.execute(query, parm);
    return rows;
  } catch (error) {
    console.log(error);
  } finally {
    connection.release(); // 释放连接回连接池
  }
};

//關閉
const closeGCPPool = () => {
  pool.end();
};

module.exports = {
  createGCPMysqlPool,
  useGCPMysql,
  closeGCPPool,
};
