const fs = require("fs");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");
const path = require("path");

const extractText = async (filePath) => {
  try {
    const ext = path.extname(filePath).toLowerCase();

    console.log("File Path:", filePath);
    console.log("Extension:", ext);

    if (ext === ".pdf") {
      const buffer = fs.readFileSync(filePath);

      console.log("PDF Size:", buffer.length);

      const data = await pdf(buffer);

      console.log("PDF Text Length:", data.text.length);

      return data.text || "";
    }

    if (ext === ".docx") {
      const result = await mammoth.extractRawText({
        path: filePath,
      });

      console.log("DOCX Text Length:", result.value.length);

      return result.value || "";
    }

    console.log("Unsupported File");

    return "";
  } catch (error) {
    console.log("Extract Error:");
    console.log(error);

    return "";
  }
};

module.exports = extractText;