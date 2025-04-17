require("dotenv").config({ path: "../.env" });
const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");
// const { GoogleAuth } = require("google-auth-library");
const axios = require("axios");

async function generateIdToken() {
  //  // 读取 JSON 文件
  const serviceAccountKey = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../config/upheld-now-268802-fe1c71cb51a7.json")
    )
  );
  // 定义 JWT 的 payload
  const payload = {
    alg: "RS256",
    typ: "JWT",
    iss: serviceAccountKey.client_email,
    sub: serviceAccountKey.client_email,
    aud: "https://www.googleapis.com/oauth2/v4/token",
    target_audience: process.env.GCP_URL,
    exp: Math.floor(Date.now() / 1000) + 3600,
    iat: Math.floor(Date.now() / 1000),
  };

  // 签发 JWT
  const jwtToken = jwt.sign(payload, serviceAccountKey.private_key, {
    algorithm: "RS256",
  });

  const url = "https://www.googleapis.com/oauth2/v4/token";
  const headers = {
    Authorization: `Bearer ${jwtToken}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const data = `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwtToken}`;

  try {
    const response = await axios.post(url, data, { headers });
    return response.data.id_token;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

module.exports = {
  generateIdToken,
};
//由 Google 签名的 ID 令牌会在最初生成请求的 1 小时内过期。
// 使用您的 JWT 執行請求
//這個方法
// https://cloud.google.com/functions/docs/securing/authenticating?hl=zh-cn#exchanging_a_self-signed_jwt_for_a_google-signed_id_token
