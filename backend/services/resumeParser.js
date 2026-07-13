const axios = require("axios");
const fs = require("fs");
const path = require("path");
const extractText = require("../utils/extractText");

const parseResume = async (fileUrl, fileName) => {
  try {

    const tempDir = path.join(__dirname, "../temp");

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const filePath = path.join(tempDir, fileName);

    console.log("Downloading Resume...");

    const response = await axios({
      url: fileUrl,
      method: "GET",
      responseType: "stream",
    });

    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    const text = await extractText(filePath);

    fs.unlinkSync(filePath);

    return text;

  } catch (error) {

    console.log(error);

    return "";
  }
};

module.exports = parseResume;