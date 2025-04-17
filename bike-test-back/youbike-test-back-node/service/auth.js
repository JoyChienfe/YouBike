require("dotenv").config({ path: "../.env" });
const jwt = require("jsonwebtoken");
const appError = require("../service/appError");

const auth = async (req, res, next) => {
  // console.log(11);
  const token = req.headers.authorization;
  if (!token) {
    return appError(403, "token不存在", next);
  }
  try {
    const secretKey = process.env["JWT_KEY"];
    await new Promise((resolve, reject) => {
      jwt.verify(token.split(" ")[1], secretKey, (err, payload) => {
        if (err) {
          return appError(401, "驗證失敗", next);
        } else {
          resolve(payload);
        }
      });
    });
    // console.log("成功");
    next();
  } catch (error) {
    return appError(401, "token驗證錯誤", next);
  }
};

module.exports = auth;
