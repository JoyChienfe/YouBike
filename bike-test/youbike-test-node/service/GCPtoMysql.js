require("dotenv").config({ path: "../.env" });
const gcpdata = require("./getGCPdata");
const { useGCPMysql, closeGCPPool, createGCPMysqlPool } = require("./cloudSql");
const cron = require("node-cron");

//把gcpg上的場站加到cloud mysql
async function GCPtoMysql() {
  try {
    // 创建连接
    createGCPMysqlPool();
    console.log("連接成功");
    const gcpres = await gcpdata();
    console.log(gcpres);
    console.log("取得gcp資料成功.....");
    await useGCPMysql("delete from stations");
    console.log("刪除stations資料成功.....");
    for (let i = 0; i < gcpres.length; i++) {
      if (gcpres[i]["city"] !== null) {
        await useGCPMysql(
          `INSERT INTO stations (City, Station_Name, Station_Number, Sys) VALUES ('${gcpres[i]["city"]}', '${gcpres[i]["s_name_tw"]}', ${gcpres[i]["s_no"]}, '${gcpres[i]["sys"]}')`,
          []
        );
      }
    }
    console.log("更新mysql資料成功....");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    closeGCPPool();
  }
}

// GCPtoMysql();
let isUpdating = false;
const editgcpdata = () => {
  //每天一點
  cron.schedule(
    "00 00 01 * * *",
    async () => {
      try {
        if (isUpdating) {
          console.log("進行刪除中別打擾....");
          return;
        }
        isUpdating = true;
        // await GCPtoMysql();
      } catch (error) {
        console.log("每天一點更新失敗", error);
      } finally {
        isUpdating = false;
      }
    },
    {
      scheduled: true,
      timezone: "Asia/Taipei",
    }
  );
};

module.exports = { editgcpdata, GCPtoMysql };
