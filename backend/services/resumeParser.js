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
      responseType: "arraybuffer",
    });

    fs.writeFileSync(filePath, response.data);

    console.log("Saved File:", filePath);

    const text = await extractText(filePath);

    console.log("Extracted Text Length:", text.length);

    fs.unlinkSync(filePath);

    return text;

  } catch (err) {

    console.log("Resume Parser Error");
    console.log(err);

    return "";
  }
};

module.exports = parseResume;