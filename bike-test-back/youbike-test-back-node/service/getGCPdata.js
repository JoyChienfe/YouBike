require("dotenv").config({ path: "../.env" });
const { generateIdToken } = require("../service/GetgoogleIDtoken");
const axios = require("axios");

const gcpdata = async () => {
  try {
    let gcptoken = null;
    const generateAndSetIdToken = async () => {
      gcptoken = await generateIdToken();
    };
    // 首次執行
    await generateAndSetIdToken();
    const payload = {
      dataset_id: "yb2",
      table_id: "station",
    };
    const url = process.env.GCP_URL;
    const gcpres = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${gcptoken}`,
      },
    });
    const resdata = gcpres.data;
    return resdata;
  } catch (error) {
    console.log(error);
  }
};
module.exports = gcpdata;
