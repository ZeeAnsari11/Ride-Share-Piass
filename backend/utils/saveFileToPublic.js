const fs = require("fs");
const path = require("path");
const saveFileToPublic = (file, type = "images", prevName) => {

    let name = new Date().getTime().toString() + "." + file.originalname.split(".").pop();
    if (prevName) {
        name = prevName;
    }
    let filePath = path.join(__dirname, `../public/${type}`);
    let pathWithFileName = path.join(__dirname, `../public/${type}/${name}`);
    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
    };

    fs.writeFileSync(pathWithFileName, file.buffer);
    return name;
}

module.exports = saveFileToPublic;