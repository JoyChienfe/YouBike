require("dotenv").config({ path: "../.env" });
const { Storage } = require("@google-cloud/storage");
const path = require("path");

const serviceAccountKey = path.join(
  __dirname,
  "../config/upheld-now-268802-fe1c71cb51a7.json"
);

// 載入 Google Cloud Storage 的認證憑證 JSON 金鑰檔案
const storage = new Storage({
  keyFilename: serviceAccountKey,
});
const bucketName = process.env.GCP_STORAGE_BUCKETNAME; // 存儲桶名稱
// const filename = process.env.GCP_STORAGE_FILENAME; // storage 資料夾名稱

async function uploadFile(dataname, path) {
  const filePath = path;
  // 獲取存儲桶對象
  const bucket = storage.bucket(bucketName);

  try {
    // 上傳檔案到存儲桶
    await bucket.upload(filePath, {
      destination: `youbike-log/${dataname}`,
      metadata: {
        contentType: "application/vnd.ms-excel",
      },
    });
    console.log(`儲存${dataname}至 ${bucketName}/youbike-log成功`);
    return `儲存${dataname}至 ${bucketName}/youbike-log成功`;
  } catch (error) {
    return `上傳失敗 ${error.message}`;
  }
}

async function deleteFile(name) {
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(`youbike-log/${name}`);

  // 嘗試刪除檔案
  await file.delete();

  console.log(`File  deleted from ${bucketName}.`);
  return `刪除檔案成功`;
}

async function listFiles() {
  try {
    const bucket = storage.bucket(bucketName);

    //取得youbike-data/youbike-test 下所有資料夾名稱
    const [files] = await bucket.getFiles({
      prefix: "youbike-test",
    });
    const filesItem = files.map((i) => i.name.split("/")[1]);

    return filesItem;
  } catch (error) {
    console.error("Error listing files:", error);
  }
}

module.exports = {
  uploadFile,
  listFiles,
};
