const express = require("express");
const router = express.Router();
const appError = require("../service/appError");
const { useGCPMysql } = require("../service/cloudSql");
const auth = require("../service/auth");

/* GET home page. */
//查看所有人員公號姓名角色
router.get("/users", auth, async (req, res, next) => {
  try {
    const data = await useGCPMysql(`select * from users`, []);
    res.status(200).json(data);
  } catch (error) {
    return appError(500, "資料庫查詢錯誤", next);
  }
});

router.patch("/role", auth, async (req, res, next) => {
  try {
    const { id, role } = req.body;
    if (!id || !role) {
      return appError(403, "參數不正確", next);
    }
    await useGCPMysql(
      `UPDATE users
    SET role_id = ?
    WHERE user_id = ?`,
      [role, id]
    );
    res.status(200).json({ maeeage: `修改${id}成${role}成功` });
  } catch (error) {
    appError(500, "資料庫查詢錯誤", next);
  }
});

module.exports = router;
