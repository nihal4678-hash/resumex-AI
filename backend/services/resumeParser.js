const axios = require("axios");
const fs = require("fs");
const path = require("path");
const extractText = require("../utils/extractText");

const parseResume = async (fileUrl, fileName) => {
  try {
    console.log("Downloading:", fileUrl);

    // Create temp folder
    const tempDir = path.join(__dirname, "../temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    // Keep original extension
    const ext = path.extname(fileName) || ".pdf";
    const tempFile = path.join(tempDir, `${Date.now()}${ext}`);

    // Download file from Cloudinary
    const response = await axios({
      url: fileUrl,
      method: "GET",
      responseType: "arraybuffer",
    });

    // Save file
    fs.writeFileSync(tempFile, response.data);

    console.log("Saved:", tempFile);

    // Extract text
    const text = await extractText(tempFile);

    console.log("Extracted length:", text.length);

    // Delete temp file
    fs.unlinkSync(tempFile);

    return text;

  } catch (error) {
    console.log("Resume Parser Error:");
    console.log(error.message);
    return "";
  }
};

module.exports = parseResume;