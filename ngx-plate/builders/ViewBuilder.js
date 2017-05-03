'use strict';
let writer = require('./../common/Writer.js');
let JavaScriptGenerator = require('./../common/JavaScriptGenerator.js');

class ViewBuilder {
  constructor(name, properties, frameworkStyle) {
    this.name = name;
    this.properties = properties;
    this.frameworkStyle = frameworkStyle;
  }

  createTemplate() {
    writer.writeTemplate(`${this.name}.html`,`${this.name}`, this._getTemplate());
  }

  _getTemplate() {
    return this._generateFields(this.properties, this.frameworkStyle);
  }

  _generateFields(properties, frameworkStyle) {
    if (frameworkStyle == 1) {
      return this._getNoneStyleInputFields(properties);
    } else if (frameworkStyle == 2) {
      return this._getBootstrapInputFields(properties);
    } 
  }

  _getNoneStyleInputFields(properties) {
    let template = '';
    properties.map((property) => {
      if (property.type == 'string' || property.type == 'number') {
        template+= `
<input type="${property.type == 'string' ? 'text' : 'number'}" [(ngModel)]="${property.name}">`;
      }
      else if (property.type == 'boolean') {
        template+= `
<input type="checkbox" [(ngModel)]="${property.name}"> ${property.name}`;
      }
      else if (property.type == 'array') {
        template+= `
<select [(ngModel)]="selected${property.name}" ng-options="aux${property.name} for aux${property.name} in ${property.name}"></select>`;
      }
    });

    return template;
  }

  _getBootstrapInputFields(properties) {
    let template = '';
    properties.map((property) => {
      if (property.type == 'string' || property.type == 'number') {
        template+= `
<div class="col-md-2">
  <div class="input-group">
    <span class="input-group-addon">${JavaScriptGenerator.getPascalCamelCaseName(property.name)}</span>
    <input type="${property.type == 'string' ? 'text' : 'number'}" [(ngModel)]="${property.name}" class="form-control">
  </div>
</div>`;
      }
      else if (property.type == 'boolean') {
        template+= `
<div class="col-md-2">
  <div class="input-group">
    <span class="input-group-addon">
      <input type="checkbox" [(ngModel)]="${property.name}">
    </span>
    <span class="form-control">${JavaScriptGenerator.getPascalCamelCaseName(property.name)}</span>
  </div>
</div>`;
      }
      else if (property.type == 'array') {
        template+= `
<div class="col-md-2">
  <div class="input-group">
    <span class="input-group-addon">${JavaScriptGenerator.getPascalCamelCaseName(property.name)}</span>
    <select [(ngModel)]="${property.name}" class="form-control">
     <option *ngFor="let item of ${property.name}" [value]="item.Value">{{item.Name}}</option>
    </select>
  </div>
</div>`;
      }
    });

    return template;
  }
}

module.exports = ViewBuilder;
