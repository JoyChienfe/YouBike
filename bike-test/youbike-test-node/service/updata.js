require("dotenv").config({ path: "../.env" });
const { Storage } = require("@google-cloud/storage");
const { log } = require("console");
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
const filename = process.env.GCP_STORAGE_FILENAME; // storage 資料夾名稱

async function uploadFile(dataname, path) {
  const filePath = path;
  // 獲取存儲桶對象
  const bucket = storage.bucket(bucketName);

  try {
    // 上傳檔案到存儲桶
    await bucket.upload(filePath, {
      destination: `${filename}/${dataname}`,
      metadata: {
        contentType: "application/vnd.ms-excel",
      },
    });
    console.log(`儲存${dataname}至 ${bucketName}/${filename}成功`);
    return `儲存${dataname}至 ${bucketName}/${filename}成功`;
  } catch (error) {
    return `上傳失敗 ${error.message}`;
  }
}

async function deleteFile(name) {
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(`${filename}/${name}`);

  // 嘗試刪除檔案
  await file.delete();

  console.log(`File ${filename} deleted from ${bucketName}.`);
  return `刪除檔案成功`;
}

async function uploadImageFile(dataname, infile, inSertFileName) {
  //驗證這個資料夾有沒有相同檔名

  try {
    // let destination;
    // const bucket = storage.bucket(bucketName);
    // const filesArr = await queryFiles(inSertFileName);
    // //如果資料夾檔案內有相同名稱就把他改名
    // console.log(filesArr);
    // if (filesArr.includes(dataname)) {
    //   destination = `${filename}/${inSertFileName}/新-${dataname}`;
    // } else {
    //   destination = `${filename}/${inSertFileName}/${dataname}`;
    // }
    // console.log(destination);

    const bucket = storage.bucket(bucketName);
    const destination = `${filename}/${inSertFileName}/${dataname}`;
    console.log("filename:", filename);
    console.log("inSertFileName:", inSertFileName);
    console.log("dataname:", dataname);
    const bucketres = await bucket.upload(infile, {
      destination,
      metadata: {
        contentType: "image/jpeg",
      },
    });
    return "儲存成功";
  } catch (error) {
    return `上傳圖片失敗 ${error.message}`;
  }
}

// uploadFile("簡報5", "C:/Users/GB3192/Desktop/分機.xlsx");

module.exports = {
  uploadImageFile,
  deleteFile,
  uploadFile,
};
