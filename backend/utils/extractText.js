const fs = require("fs");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");

const extractText = async (filePath) => {
  try {
    console.log("Reading:", filePath);

    // PDF
    if (filePath.toLowerCase().endsWith(".pdf")) {
      const buffer = fs.readFileSync(filePath);
      const data = await pdf(buffer);

      console.log("PDF text length:", data.text.length);

      return data.text;
    }

    // DOCX
    if (filePath.toLowerCase().endsWith(".docx")) {
      const result = await mammoth.extractRawText({
        path: filePath,
      });

      console.log("DOCX text length:", result.value.length);

      return result.value;
    }

    console.log("Unsupported file type");
    return "";

  } catch (error) {
    console.log("Extract Error:");
    console.log(error.message);
    return "";
  }
};

module.exports = extractText;