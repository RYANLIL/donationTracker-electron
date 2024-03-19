import fs from "node:fs";

export default function readFromFile(filePath: string) {
  return new Promise((resolve, reject) => {
    const jsonStream = fs.createReadStream(filePath, { encoding: "utf8" });
    let data = "";

    jsonStream.on("data", (chunk) => {
      data += chunk;
    });

    jsonStream.on("end", () => {
      try {
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    });

    jsonStream.on("error", (error) => {
      reject(error);
    });
  });
}
// Example usage:
// readLargeJsonFile('path/to/large.json')
//     .then(data => {
//         console.log('Successfully read JSON data:', data);
//         // You can process the data further here
//     })
//     .catch(error => {
//         console.error('Error reading JSON file:', error);
//     });
