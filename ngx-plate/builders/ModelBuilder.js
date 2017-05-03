'use strict';
let writer = require('./../common/Writer.js');
let JavaScriptGenerator = require('./../common/JavaScriptGenerator.js');

class ModelBuilder {
  constructor(componentName, properties) {
    this.componentName = componentName;
    this.properti0es = properties;
  }

  createTemplate() {
    writer.writeTemplate(`${this.componentName}.model.ts`,`${this.componentName}`, this._getTemplate());
  }

  _getTemplate() {
    let template = `
    export class ${JavaScriptGenerator.getPascalCamelCaseName(this.componentName)} {
     ${this._getProperties(this.properties)}
    }
  })    
    `;
       
    return template;
  }

  _getProperties(propertyList) {
    let properties = '';
    let iterations = 0;
    propertyList.map((property) => {
      properties += `
      ${property.name} : ${property.type};`
      iterations++;
    });
    return properties;
  }

}

module.exports = ModelBuilder;
