'use strict';

class JavaScriptGenerator {
  constructor() {}

  getPascalCamelCaseName(name) {
      return name[0].toUpperCase() + name.substr(1);
  }

  getProperties(propertyList) {
    let properties = '';
    let iterations = 0;
    propertyList.map((property) => {
      if (!property.value || property.type == 'number' || property.type == 'boolean') {
        if (iterations > 0) {
          properties += `
      ${property.name}: ${property.value},`;
        } else {
          properties += `${property.name}: ${property.value},`;
        }
      }
      else if(property.type == 'string') {
        if (iterations > 0) {
          properties += `
      ${property.name}: '${property.value}',`;
        } else {
          properties += `${property.name}: '${property.value}',`;
        }
      }
      else if(property.type == 'array') {
        if (iterations > 0) {
          properties += `
      ${property.name}: [${this.getQuotedPropertiesFromArray(property.value)}],`;
        } else {
          properties += `${property.name}: [${this.getQuotedPropertiesFromArray(property.value)}],`;
        }
      }
      iterations++;
    });
    return properties;
  }

  getQuotedPropertiesFromArray(properties) {
    let quotedProperties = '';
    for (let i = 0; i < properties.length; i++) {
      let property = properties[i];
      if (i != properties.length - 1) {
        quotedProperties+= `'${property}', `;
      } else {
        quotedProperties+= `'${property}'`;
      }
    }
    return quotedProperties;
  }

}

module.exports = new JavaScriptGenerator();
