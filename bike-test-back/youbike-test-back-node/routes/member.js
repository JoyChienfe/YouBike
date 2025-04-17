require("dotenv").config({ path: "../.env" });
const express = require("express");
const router = express.Router();
const appError = require("../service/appError");
const auth = require("../service/auth");
const { bindAsync, closeAsync } = require("../service/ldap");
const jwt = require("jsonwebtoken");

router.get("/auth", auth, async (req, res, next) => {
  res.status(200).json({ message: "驗證成功" });
});

router.post("/login", async (req, res, next) => {
  const { account, password } = req.body;
  if (!account || !password) {
    // console.log("帳號密碼格式錯誤");
    return appError(401, "格式錯誤", next);
  }

  try {
    // console.log("開始連接ldap");
    await bindAsync(account, password);
    // console.log(res);
    await closeAsync();
  } catch (error) {
    // console.log("連接失敗", error);
    return appError(401, "帳號或密碼錯誤", next);
  }
  try {
    const person = { account };
    // const id = person.account;
    // if (
    //   id === "GB2936" ||
    //   id === "GB1364" ||
    //   id === "G96186" ||
    //   id === "GB3192"
    // ) {
    const secretKey = process.env["JWT_KEY"];
    const token = jwt.sign({ person }, secretKey, { expiresIn: "8h" });
    res.status(200).json({ token });
    // } else {
    //   return appError(403, "權限不足", next);
    // }
  } catch (error) {
    // console.log(error);
    return appError(500, "製作jwt發生錯誤", next);
  }
});

module.exports = router;
