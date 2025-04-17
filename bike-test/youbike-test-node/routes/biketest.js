require("dotenv").config({ path: "../.env" });
const express = require("express");
var router = express.Router();
const appError = require("../service/appError");
const fs = require("fs");
const auth = require("../service/auth");
const { useGCPMysql } = require("../service/cloudSql");
const multer = require("multer");
const upload = multer({ dest: "temp/" });

//新增模擬體驗表單
router.post("/biketest", auth, async (req, res, next) => {
  try {
    const {
      sys,
      user_id,
      test_date,
      station_name,
      carnum,
      carnum2,
      tablejson,
    } = req.body;
    const tablejsonJSON = JSON.stringify(tablejson);
    const sql = `INSERT INTO bike_test (sys, user_id, edit_id, test_date, station_name, carnum, carnum2, testtable)
        VALUES (?, ?, ?, ?, ?, ?, ?,?)`;
    await useGCPMysql(sql, [
      sys,
      user_id,
      "",
      test_date,
      station_name,
      carnum,
      carnum2,
      tablejsonJSON,
    ]);
    res.status(200).json({ message: "模擬體驗新增成功" });
  } catch (error) {
    console.log(error);
    appError(500, "新增失敗", next);
  }
});

//查看單一id模擬體驗表單
router.get("/biketest", auth, async (req, res, next) => {
  const { id } = req.query;
  if (!id) {
    return appError(403, "格式錯誤", next);
  }
  try {
    const data = await useGCPMysql(
      `select * from bike_test where user_id = ? ORDER BY test_date DESC`,
      [id]
    );
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    appError(500, "資料庫查詢錯誤", next);
  }
});

//查看全部模擬體驗表單
router.get("/Allbiketest", auth, async (req, res, next) => {
  try {
    const data = await useGCPMysql(
      `select * from bike_test  ORDER BY test_date DESC`,
      []
    );
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    appError(500, "資料庫查詢錯誤", next);
  }
});

//上傳檔案
const { uploadImageFile } = require("../service/updata");
router.post("/upload", upload.single("image"), async (req, res, next) => {
  // {
  //     fieldname: 'image',
  //     originalname: 'downloadrwerewrew.jpg',
  //     encoding: '7bit',
  //     mimetype: 'image/jpeg',
  //     destination: 'temp/',
  //     filename: 'daa2046f39f284f16737028fbc5f1bdf',
  //     path: 'temp\\daa2046f39f284f16737028fbc5f1bdf',
  //     size: 5413
  // }

  const { payload } = req.body;
  const { originalname, path } = req.file;
  console.log(originalname, path);
  if (!originalname || !path) return appError(400, "上傳失敗", next);
  try {
    const resMsg = await uploadImageFile(
      `${originalname}-${Date.now()}`,
      path,
      payload
    );

    fs.unlink(path, (err) => {
      if (err) {
        console.error("刪除臨時文件失敗：", err);
      } else {
        console.log("臨時文件已成功刪除");
      }
    });
    res.status(200).json({
      message: resMsg,
    });
  } catch (error) {
    return appError(400, error, next);
  }
});

module.exports = router;
