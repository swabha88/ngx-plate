'use strict';
let prompt = require('prompt');
let colors = require("colors/safe");
let ComponentBuilder = require('./../builders/ComponentBuilder');
let ModelBuilder = require('./../builders/ModelBuilder');
let ViewBuilder = require('./../builders/ViewBuilder');
let WizardParser = require('./../common/WizardParser.js');

class ComponentWizard {
  constructor() {}

  init () {
    let schema = {
      properties: {
        name: {
          description: colors.green('Enter a name for your component'),
          message: colors.green('Name of component is required'),
          required: true
        },
        properties: {
          description: colors.green('Write properties for your component separated by # (name:type:value) \n')
        },
        nameView: {
          description: colors.green('Name for view: '),
          message: colors.red('Name of view is required'),
          required: true
        },
        frameworkStyle: {
          description: colors.green('Framework style: \n 1. None 2. Bootstrap ')
        }
      }
    };
    prompt.start();
    prompt.get(schema, (err, result) => {
      if (err) console.log(err);
      let properties = WizardParser.getProperties(result.properties);
      //let dependencies = WizardParser.getDependencies(result.dependencies);
      let component = new ComponentBuilder(result.name, properties);
      component.createTemplate();
      let model = new ModelBuilder(result.name, properties);
      model.createTemplate();
      let view = new ViewBuilder(result.nameView, properties, result.frameworkStyle);
      view.createTemplate();
    });
  }
}

module.exports = new ComponentWizard();
