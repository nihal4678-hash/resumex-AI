const axios = require("axios");
const fs = require("fs");
const path = require("path");
const extractText = require("../utils/extractText");

const parseResume = async (fileUrl, fileName) => {
  try {

    console.log("========== PARSER ==========");
    console.log("URL:", fileUrl);
    console.log("Filename:", fileName);

    const tempDir = path.join(__dirname, "../temp");

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const filePath = path.join(tempDir, fileName);

    console.log("Saving File To:");
    console.log(filePath);

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

    console.log("Download Completed");

    const text = await extractText(filePath);

    console.log("Extracted Characters:", text.length);

    fs.unlinkSync(filePath);

    return text;

  } catch (error) {

    console.log("Resume Parser Error");
    console.log(error);

    return "";
  }
};

module.exports = parseResume;