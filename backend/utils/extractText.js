const fs = require("fs");
const pdf = require("pdf-parse");
const mammoth = require("mammoth");



const extractText = async (filePath) => {
  console.log("Reading:", filePath);

  if (filePath.toLowerCase().endsWith(".pdf")) {
    const buffer = fs.readFileSync(filePath);

    const data = await pdf(buffer);

    console.log(data.text.length);

    return data.text;
  }

  if (filePath.toLowerCase().endsWith(".docx")) {
    const result = await mammoth.extractRawText({
      path: filePath,
    });

    return result.value;
  }

  return "";
};

module.exports = extractText;