'use strict';
let prompt = require('prompt');
let colors = require('colors');
let ModelBuilder = require('./../builders/ModelBuilder');
let ComponentBuilder = require('./../builders/ComponentBuilder');
let WizardParser = require('./../common/WizardParser.js');
let ViewBuilder = require('./../builders/ViewBuilder.js');
let ServiceBuilder = require('./../builders/ServiceBuilder');
let JavaScriptGenerator = require('./../common/JavaScriptGenerator.js');

class CompleteCRUDWizard {
  constructor() {}

  init() {
    let schema = {
      properties: {
        entityName: {
          description: colors.green('Enter entity name'),
          message: colors.red('Name of entity is required'),
          required: true
        },
        properties: {
          description: colors.green('Write properties for your controller separated by # (name:type:value) \n')
        },
        // dependencies: {
        //   description: colors.green('Write dependencies for your controller separated by , : ($scope already added) \n')
        // },
        frameworkStyle: {
          description: colors.green('Framework style: \n 1. None 2. Bootstrap')
        },
        urlService: {
          description: colors.green('API URL (example: http://localhost/api)'),
          required: true,
          message: colors.red('Url name is required')
        }
      }
    };
    prompt.start();
    prompt.get(schema, (err, result) => {
      if (err) console.log(err);
      let properties = WizardParser.getProperties(result.properties);
      let model = new ModelBuilder(result.entityName, properties);
      model.createTemplate();
      let component = new ComponentBuilder(`${result.entityName}`, properties, result.entityName);
      component.createTemplate();
      let view = new ViewBuilder(`${result.entityName}`, properties, result.frameworkStyle);
      view.createTemplate();
      let service = new ServiceBuilder(result.entityName, result.urlService, result.crudType);
      service.createTemplate();
    });
  }
}

module.exports = new CompleteCRUDWizard();
