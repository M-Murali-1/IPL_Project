const csv = require('csv-parser'); // Install with `npm install csv-parser`
const fs = require('fs');
const path = require('path');

// Function to convert CSV to JSON
function csvToJson(filePath) {
  const results = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

// Function to save JSON data to a file
function saveJsonToFile(jsonData, outputFilePath) {
  const jsonString = JSON.stringify(jsonData, null, 2); // Beautify the JSON
  fs.writeFileSync(outputFilePath, jsonString, 'utf8');
}

// Paths to input and output files
const inputFilePath = path.join(__dirname, '../data/deliveries.csv');
const outputFilePath = path.join(__dirname, '../public/output/deliveries.json');

// Convert and save
csvToJson(inputFilePath)
  .then((jsonResult) => {
    saveJsonToFile(jsonResult, outputFilePath);
    console.log(`CSV has been converted to JSON and saved to ${outputFilePath}`);
  })
  .catch((error) => console.error("Error:", error));
