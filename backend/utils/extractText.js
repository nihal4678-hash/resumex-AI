const fs = require("fs");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");

const extractText = async (filePath) => {
  try {
    console.log("Reading:", filePath);

    if (filePath.toLowerCase().endsWith(".pdf")) {
      console.log("PDF detected");

      const dataBuffer = fs.readFileSync(filePath);

      const data = await pdf(dataBuffer);

      console.log("PDF text:", data.text.length);

      return data.text;
    }

    if (filePath.toLowerCase().endsWith(".docx")) {
      console.log("DOCX detected");

      const result = await mammoth.extractRawText({
        path: filePath,
      });

      console.log("DOCX text:", result.value.length);

      return result.value;
    }

    console.log("Unsupported file");

    return "";
  } catch (error) {
    console.log("Extract Error:");
    console.log(error);

    return "";
  }
};

module.exports = extractText;