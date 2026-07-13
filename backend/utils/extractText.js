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

      console.log("PDF Parsed");

      return data.text;
    }

    if (filePath.toLowerCase().endsWith(".docx")) {

      console.log("DOCX detected");

      const result = await mammoth.extractRawText({
        path: filePath,
      });

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