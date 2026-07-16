const axios = require("axios");
const fs = require("fs");
const path = require("path");
const extractText = require("../utils/extractText");

const parseResume = async (fileUrl, fileName) => {
  try {
    console.log("Downloading:", fileUrl);

    const tempDir = path.join(__dirname, "../temp");

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const filePath = path.join(tempDir, fileName);

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

    console.log("Saved file:", filePath);

    const text = await extractText(filePath);

    console.log("Extracted text length:", text.length);

    fs.unlinkSync(filePath);

    return text;

  } catch (error) {
    console.log("Resume Parser Error:");
    console.log(error);
    return "";
  }
};

module.exports = parseResume;