'use strict';

let prompt = require('prompt');
let colors = require("colors/safe");
let ComponentWizard = require('./app/wizards/ComponentWizard.js');
let CRUDServiceWizard = require('./app/wizards/CRUDServiceWizard.js');
let CompleteCRUDWizard = require('./app/wizards/CompleteCRUDWizard.js');

let schema = {
  properties: {
    create: {
      description: colors.blue('\nWelcome to Angular2plate:\n') + colors.green('What do you want to create? \n'
      +' 1. Component + Model + View \n 2. CRUD Service \n 3. Complete CRUD (Component + Model + View + Service) \n 0. Exit'),
      required: true
    }
  }
}
prompt.message = colors.white("Angular2Plate!")
prompt.start();

prompt.get(schema, function (err, result) {
  if (err) console.log(err);

  if (result.create == 1) {
    ComponentWizard.init();
  }
  else if (result.create == 2) {
    CRUDServiceWizard.init();
  }
  else if (result.create == 3) {
    CompleteCRUDWizard.init();
  }
  else if (result.create == 0) {
    console.log('Bye!');
    process.exit();
  }

});
