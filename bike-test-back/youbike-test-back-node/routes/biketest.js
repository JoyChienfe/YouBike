const express = require("express");
const router = express.Router();
const appError = require("../service/appError");
const { useGCPMysql } = require("../service/cloudSql");
const auth = require("../service/auth");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const upload = multer({ dest: "temp/" });
/* GET home page. */
//查看全部模擬體驗表單
router.get("/Allbiketest", auth, async (req, res, next) => {
  try {
    const data = await useGCPMysql(
      `SELECT  t2.user_name, t1.* 
      FROM bike_test as t1
      JOIN users as t2 ON t1.user_id = t2.user_id`,
      []
    );
    res.status(200).json(data);
  } catch (error) {
    return appError(500, "資料庫查詢錯誤", next);
  }
});

//編輯模擬體驗表單
router.put("/biketest/:id", auth, async (req, res, next) => {
  //先刪除
  try {
    const { id } = req.params;
    const sql = `delete from bike_test where id=${id}`;
    await useGCPMysql(sql, []);
    console.log("刪除成功");
  } catch (error) {
    return appError(500, "刪除資料失敗", next);
  }

  try {
    const { id } = req.params;
    const {
      sys,
      user_id,
      test_date,
      city,
      station_name,
      carnum,
      carnum2,
      testtable,
    } = req.body;
    const tablejsonJSON = JSON.stringify(testtable);
    const sql = `INSERT INTO bike_test (id,sys, user_id, edit_id, test_date, station_name, carnum, carnum2, testtable)
          VALUES (?,?, ?, ?, ?, ?, ?, ?,?)`;
    await useGCPMysql(sql, [
      id,
      sys,
      user_id,
      "",
      test_date,
      `${city}-${station_name.split("-")[1]}`,
      carnum,
      carnum2,
      tablejsonJSON,
    ]);
    console.log("新增成功");
    res.status(200).json({ message: "模擬體驗更新成功" });
  } catch (error) {
    console.log(error);
    return appError(500, "更新失敗", next);
  }
});

//刪除模擬體驗表單
router.delete("/biketest/:id", auth, async (req, res, next) => {
  //先刪除
  try {
    const { id } = req.params;
    const sql = `delete from bike_test where id=${id}`;
    console.log(sql);
    await useGCPMysql(sql, []);
    res.status(200).json({ message: "刪除成功" });
  } catch (error) {
    return appError(500, "刪除資料失敗", next);
  }
});

const { uploadFile, listFiles } = require("../service/updata");

//這裡的"file" 要跟前端的fontdata 的名稱對上
router.post("/upload", upload.single("file"), async (req, res, next) => {
  try {
    // const { payload } = req.body;
    const { originalname, path } = req.file;

    console.log(req.file);
    if (!originalname || !path) return appError(400, "上傳失敗", next);

    try {
      const resMsg = await uploadFile(`${originalname}`, path);

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
  } catch (error) {
    return appError(400, error, next);
  }
});

router.get("/filelist", async (req, res, next) => {
  try {
    const list = await listFiles();
    res.status(200).json(list);
  } catch (error) {
    return appError(400, "抓資料失敗", next);
  }
});

module.exports = router;
