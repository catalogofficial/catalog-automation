var XLSX = require('xlsx');

function readFromExcel(sheetName, filePath) {
    var workbook = XLSX.readFile(filePath);
    var worksheet = workbook.Sheets[sheetName];

    return XLSX.utils.sheet_to_json(worksheet);
}

module.exports.readFromExcel = readFromExcel;
