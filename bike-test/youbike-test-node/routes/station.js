require("dotenv").config({ path: "../.env" });
const express = require("express");
var router = express.Router();
const appError = require("../service/appError");
const auth = require("../service/auth");
const { useGCPMysql } = require("../service/cloudSql");

//查看所有場站
router.get("/stations", auth, async (req, res, next) => {
  try {
    const resData = await useGCPMysql("select * from stations", []);
    const data = resData.map((item) => {
      return {
        City: item.City,
        Station_Name: `${item.City}-${item.Station_Name}`,
        Station_Number: item.Station_Number,
        Sys: item.Sys,
      };
    });
    res.status(200).json({ data });
  } catch (error) {
    appError(500, "資料庫查詢錯誤", next);
  }
});

//查看單一使用者場站檢驗並使用降冪 1.0
router.get("/station1", auth, async (req, res, next) => {
  const { id } = req.query;
  if (!id) {
    return appError(403, "格式錯誤", next);
  }
  try {
    const data = await useGCPMysql(
      `SELECT * FROM station_1_test where user_id = ? ORDER BY test_date DESC`,
      [id]
    );
    res.status(200).json({ data });
  } catch (error) {
    appError(500, "資料庫查詢錯誤", next);
  }
});

//查看單一使用者場站檢驗並使用降冪 2.0+2.0E
router.get("/station2", auth, async (req, res, next) => {
  const { id } = req.query;
  if (!id) {
    return appError(403, "格式錯誤", next);
  }
  try {
    const data = await useGCPMysql(
      `SELECT * FROM station_2_test where user_id = ? ORDER BY test_date DESC`,
      [id]
    );
    res.status(200).json({ data });
  } catch (error) {
    appError(500, "資料庫查詢錯誤", next);
  }
});

//查看全部使用者場站檢驗並使用降冪 1.0+2.0+2.0E
router.get("/stationAll", auth, async (req, res, next) => {
  console.log(1);
  try {
    const data1 = await useGCPMysql(
      `SELECT * FROM station_1_test ORDER BY test_date DESC`,
      []
    );
    const data2 = await useGCPMysql(
      `SELECT * FROM station_2_test ORDER BY test_date DESC`,
      []
    );
    const data = [...data1, ...data2];

    res.status(200).json({ data });
  } catch (error) {
    appError(500, "資料庫查詢錯誤", next);
  }
});

//新增1.0場站
router.post("/station_1", auth, async (req, res, next) => {
  try {
    const {
      date,
      user_id,
      edit_id,
      station_name,
      sys,
      carnum,
      no_carnum,
      場站周遭環境,
      KIOSK功能,
      KIOSK外觀,
      KIOSK燈片,
      場站導標桿,
    } = req.body;
    const 場站周遭環境JSON = JSON.stringify(場站周遭環境);
    const KIOSK功能JSON = JSON.stringify(KIOSK功能);
    const KIOSK外觀JSON = JSON.stringify(KIOSK外觀);
    const KIOSK燈片JSON = JSON.stringify(KIOSK燈片);
    const 場站導標桿JSON = JSON.stringify(場站導標桿);
    const sql = `INSERT INTO station_1_test (test_date, user_id, edit_id, station_name, sys, carnum, no_carnum, 場站周遭環境, KIOSK功能, KIOSK外觀, KIOSK燈片, 場站導標桿) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?)`;
    await useGCPMysql(sql, [
      date,
      user_id,
      edit_id,
      station_name,
      sys,
      carnum,
      no_carnum,
      場站周遭環境JSON,
      KIOSK功能JSON,
      KIOSK外觀JSON,
      KIOSK燈片JSON,
      場站導標桿JSON,
    ]);

    res.status(200).json({ message: "1.0場站表單新增成功" });
  } catch (error) {
    appError(500, "新增失敗", next);
  }
});

//新增2.0+2.0e場站
router.post("/station_2", auth, async (req, res, next) => {
  try {
    const {
      date,
      user_id,
      edit_id,
      station_name,
      sys,
      carnum,
      no_carnum,
      場站導標桿,
    } = req.body;
    const 場站導標桿JSON = JSON.stringify(場站導標桿);
    const sql = `INSERT INTO station_2_test (test_date, user_id, edit_id, station_name, sys, carnum, no_carnum,場站導標桿) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    await useGCPMysql(sql, [
      date,
      user_id,
      edit_id,
      station_name,
      sys,
      carnum,
      no_carnum,
      場站導標桿JSON,
    ]);

    res.status(200).json({ message: "2.0+2.0e場站表單新增成功" });
  } catch (error) {
    appError(500, "新增失敗", next);
  }
});

module.exports = router;
