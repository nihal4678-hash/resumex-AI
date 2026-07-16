const fs = require("fs");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");

const extractText = async (filePath) => {
  try {

    console.log("Reading:", filePath);

    if (filePath.toLowerCase().endsWith(".pdf")) {

      console.log("PDF Detected");

      const buffer = fs.readFileSync(filePath);

      const data = await pdf(buffer);

      console.log("PDF Text Length:", data.text.length);

      return data.text;
    }

    if (filePath.toLowerCase().endsWith(".docx")) {

      console.log("DOCX Detected");

      const result = await mammoth.extractRawText({
        path: filePath,
      });

      console.log("DOCX Text Length:", result.value.length);

      return result.value;
    }

    console.log("Unsupported File");

    return "";

  } catch (err) {

    console.log("Extract Error");
    console.log(err);

    return "";
  }
};

module.exports = extractText;