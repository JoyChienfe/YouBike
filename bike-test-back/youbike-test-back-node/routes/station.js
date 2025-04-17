const express = require("express");
const router = express.Router();
const appError = require("../service/appError");
const { useGCPMysql } = require("../service/cloudSql");
const auth = require("../service/auth");

//取得1.0場站
router.get("/station1", auth, async (req, res, next) => {
  try {
    const data = await useGCPMysql(
      `SELECT t2.user_name, t1.*  from station_1_test as t1
    JOIN users as t2 ON t1.user_id = t2.user_id`,
      []
    );
    res.status(200).json(data);
  } catch (error) {
    return appError(500, "資料庫查詢錯誤", next);
  }
});
//取得2.0場站
router.get("/station2", auth, async (req, res, next) => {
  try {
    const data = await useGCPMysql(
      `SELECT t2.user_name, t1.*  from station_2_test as t1
    JOIN users as t2 ON t1.user_id = t2.user_id`,
      []
    );
    res.status(200).json(data);
  } catch (error) {
    return appError(500, "資料庫查詢錯誤", next);
  }
});

//更新場站表單1.0
router.put("/station1/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      sys,
      user_id,
      test_date,
      station_name,
      carnum,
      no_carnum,
      場站周遭環境,
      KIOSK功能,
      KIOSK外觀,
      KIOSK燈片,
      場站導標桿,
    } = req.body;

    const updateSql = `UPDATE station_1_test SET 
                       test_date=?, 
                       user_id=?, 
                       edit_id=?, 
                       station_name=?, 
                       sys=?, 
                       carnum=?, 
                       no_carnum=?, 
                       場站周遭環境=?, 
                       KIOSK功能=?, 
                       KIOSK外觀=?, 
                       KIOSK燈片=?, 
                       場站導標桿=?
                       WHERE id=?`;

    const list = [
      test_date,
      user_id,
      "",
      station_name,
      sys,
      carnum,
      no_carnum,
      JSON.stringify(場站周遭環境),
      JSON.stringify(KIOSK功能),
      JSON.stringify(KIOSK外觀),
      JSON.stringify(KIOSK燈片),
      JSON.stringify(場站導標桿),
      id,
    ];

    await useGCPMysql(updateSql, list);
    console.log("更新成功");
    res.status(200).json({ message: "模擬體驗更新成功" });
  } catch (error) {
    console.log(error);
    return appError(500, "更新失敗", next);
  }
});

//更新場站表單2.0
router.put("/station2/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      sys,
      user_id,
      test_date,
      station_name,
      carnum,
      no_carnum,
      場站導標桿,
    } = req.body;

    const updateSql = `UPDATE station_2_test SET 
                       test_date=?, 
                       user_id=?, 
                       edit_id=?, 
                       station_name=?, 
                       sys=?, 
                       carnum=?, 
                       no_carnum=?, 
                       場站導標桿=?
                       WHERE id=?`;

    const list = [
      test_date,
      user_id,
      "",
      station_name,
      sys,
      carnum,
      no_carnum,
      JSON.stringify(場站導標桿),
      id,
    ];

    await useGCPMysql(updateSql, list);
    console.log("更新成功");
    res.status(200).json({ message: "模擬體驗更新成功" });
  } catch (error) {
    console.log(error);
    return appError(500, "更新失敗", next);
  }
});

//刪除單一場站表單1.0
router.delete("/station1/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const sql = `delete from station_1_test where id = ${id}`;
    await useGCPMysql(sql);
    res.status(200).json({ message: "刪除成功" });
  } catch (error) {
    console.log(error);
    return appError(500, "更新失敗", next);
  }
});

//刪除單一場站表單2.0
router.delete("/station2/:id", auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log("這是2.0", id);
    const sql = `delete from station_2_test where id = ${id}`;
    await useGCPMysql(sql);
    res.status(200).json({ message: "刪除成功" });
  } catch (error) {
    console.log(error);
    return appError(500, "更新失敗", next);
  }
});

module.exports = router;
