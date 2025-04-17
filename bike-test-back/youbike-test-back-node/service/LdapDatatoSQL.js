require("dotenv").config({ path: "../.env" });
const gcpdata = require("./getGCPdata");
const { useGCPMysql, closeGCPPool, createGCPMysqlPool } = require("./cloudSql");
const { searchfun } = require("./ldap");

//把gcpg上的場站加到cloud mysql
async function GCPtoMysql() {
  try {
    // 创建连接
    createGCPMysqlPool();
    await useGCPMysql("delete from users");
    const ldapres = await searchfun();
    for (let i = 0; i < ldapres.length; i++) {
      const data = ldapres[i];
      await useGCPMysql(
        "INSERT INTO users (user_id , user_name, role_id) VALUES ( ?, ? , ? )",
        [data.id, data.name, "一般幕僚"]
      );
    }
    console.log("資料更新完畢");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    closeGCPPool();
  }
}
GCPtoMysql();
module.exports = GCPtoMysql;
