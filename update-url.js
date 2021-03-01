const fs = require("fs");
require('dotenv').config();

const filePath = '/Users/maryna.ratova/Documents/Parimatch/app/src/main/java/com/parimatch/data/remoteconfig/RemoteConfigRepository.kt';

const value = process.env[process.env.ENVIRONMENT];
console.log(value);
const inputValue = value.split(',');
console.log(inputValue);

const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const writeFile = (filePath, text) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, text, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

const checkCertainString = (data, str) => {
  return data.indexOf(str) > 0;
};


readFile(filePath).then((data) => {
  let updateData = data;
  let needUpdate = false;

  let result = data.match(/= BaseUrl(?:\(([^)]+)\))/g);
  console.log(result)

  if (result.length > 0) {
    needUpdate = true;

    result.forEach((item, index) => {
      updateData = updateData.replace(item, `= BaseUrl(${inputValue[index]})`);
    });
  }

  if (needUpdate) {
    writeFile(filePath, updateData).then(() => {
      console.log(filePath + " --- updating complete");
    });
  } else {
    console.log(filePath + " --- no need update");
  }
});

