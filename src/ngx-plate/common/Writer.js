'use strict';
var fs = require('fs');

class Writer {
  constructor() {

  }

  writeTemplate(fileName, name,template) {

    if(!fs.existsSync('modules')){
      fs.mkdirSync('modules');
    }else if (!fs.existsSync(`modules/${name}`)) {
      fs.mkdirSync(`modules/${name}`);
    }
    fs.writeFile(`./modules/${name}/${fileName}`, template, function (err) {
      if (err) return console.log(err);
      console.log(`modules/${name}/${fileName} created!`);
      return true;
    });
  }
}

module.exports = new Writer();
