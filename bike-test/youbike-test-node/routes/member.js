require("dotenv").config({ path: "../.env" });
const express = require("express");
var router = express.Router();
const appError = require("../service/appError");
const { bindAsync, closeAsync } = require("../service/ldap");
const jwt = require("jsonwebtoken");
const auth = require("../service/auth");

router.get("/auth", auth, async (req, res, next) => {
  res.status(200).json({ message: "驗證成功" });
});

router.post("/login", async (req, res, next) => {
  const { account, password } = req.body;
  if (!account || !password) {
    return appError(401, "帳號密碼格式錯誤", next);
  }
  try {
    await bindAsync(account, password);
    await closeAsync();
  } catch (error) {
    return appError(401, "帳號或密碼錯誤", next);
  }
  try {
    const person = { account, password };
    const secretKey = process.env["JWT_KEY"];
    const token = jwt.sign({ person }, secretKey, { expiresIn: "8h" });
    res.status(200).json({ token });
  } catch (error) {
    return appError(500, "製作jwt發生錯誤", next);
  }
});

module.exports = router;
