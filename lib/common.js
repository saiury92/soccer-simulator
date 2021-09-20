const fs = require('fs')

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        reject(err)
      } else {
        data = JSON.parse(data)
        resolve(data)
      }
    })
  })
}

module.exports = {
  getRandomNumber,
  readFile
}
