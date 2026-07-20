const axios = require("axios");
const fs = require("fs");
const path = require("path");
const extractText = require("../utils/extractText");

const parseResume = async (fileUrl, fileName) => {
  try {
    console.log("========== RESUME PARSER ==========");
    console.log("URL:", fileUrl);

    const tempDir = path.join(__dirname, "../temp");

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const filePath = path.join(tempDir, fileName);

    const response = await axios.get(fileUrl, {
      responseType: "arraybuffer",
      validateStatus: () => true,
    });

    console.log("Cloudinary Status:", response.status);

    if (response.status !== 200) {
      console.log("Cloudinary Error:", response.data.toString());
      return "";
    }

    fs.writeFileSync(filePath, response.data);

    console.log("Saved:", filePath);

    const text = await extractText(filePath);

    console.log("Extracted Text Length:", text.length);

    fs.unlinkSync(filePath);

    return text;

  } catch (err) {
    console.log(err);
    return "";
  }
};

module.exports = parseResume;