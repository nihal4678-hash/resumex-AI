const fs = require("fs");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");

const extractText = async (filePath) => {
  try {
    // PDF File
    if (filePath.endsWith(".pdf")) {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdf(dataBuffer);
      return data.text;
    }

    // DOCX File
    if (filePath.endsWith(".docx")) {
      const result = await mammoth.extractRawText({
        path: filePath,
      });

      return result.value;
    }

    return "";
  } catch (error) {
    console.log(error);
    return "";
  }
};

module.exports = extractText;