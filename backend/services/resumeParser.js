const axios = require("axios");
const fs = require("fs");
const path = require("path");
const extractText = require("../utils/extractText");

const parseResume = async (fileUrl, fileName) => {
  try {
    console.log("=================================");
    console.log("Downloading Resume");
    console.log(fileUrl);
    console.log(fileName);
    console.log("=================================");

    const tempDir = path.join(__dirname, "../temp");

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const extension = path.extname(fileName);

    const tempFile = path.join(
      tempDir,
      `${Date.now()}${extension}`
    );

    const response = await axios({
      url: fileUrl,
      method: "GET",
      responseType: "stream",
    });

    const writer = fs.createWriteStream(tempFile);

    response.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    console.log("Downloaded File:", tempFile);

    const text = await extractText(tempFile);

    console.log("Extracted Text Length:", text.length);

    fs.unlinkSync(tempFile);

    return text;

  } catch (err) {
    console.log("Resume Parser Error");
    console.log(err);

    return "";
  }
};

module.exports = parseResume;