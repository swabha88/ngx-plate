'use strict';
let writer = require('./../common/Writer.js');
let JavaScriptGenerator = require('./../common/JavaScriptGenerator.js');

class ComponentBuilder {
  constructor(componentName, properties) {
    this.componentName = componentName;
    this.properties = properties;
  }

  createTemplate() {
    writer.writeTemplate(`${this.componentName}.component.ts`,`${this.componentName}`, this._getTemplate());
  }

  _getTemplate() {
    let template = `
    import { Component, OnInit, ViewChild} from '@angular/core';      
    import { ${JavaScriptGenerator.getPascalCamelCaseName(this.componentName)}Service } from '../${(this.componentName)}/${(this.componentName)}.service';
    @Component({
    selector: 'app-${(this.componentName)}',
    templateUrl: './${(this.componentName)}.component.html',
    styleUrls: ['./${(this.componentName)}.component.css']

    export class ${JavaScriptGenerator.getPascalCamelCaseName(this.componentName)}Component implements OnInit {
    this.${(this.componentName)} = any;
    this.${(this.componentName)}s = any[];

    constructor(private ${(this.componentName)}Service: ${JavaScriptGenerator.getPascalCamelCaseName(this.componentName)}Service) { 
        this.service = this.${(this.componentName)}Service;
    }
    
    ngOnInit(){
      // this.name = '${JavaScriptGenerator.getPascalCamelCaseName(this.componentName)}';
      this.${(this.componentName)} = new ${JavaScriptGenerator.getPascalCamelCaseName(this.componentName)}();
    }

    ${this._getCRUDMethods(this.componentName)}

    }
  })
    
    `;
    
    
    return template;
  }


  _getCRUDMethods(entityName) {
    let template = '';
    if (entityName) {
      let name = `${JavaScriptGenerator.getPascalCamelCaseName(entityName)}`;
      template = `

      get${name}s();

      get${name}s(){
           this.service.get().subscribe(result => {
              this.${entityName}s = result;
      });
      }
      
    save${name}() {
      this.service.save(this.${entityName}).subscribe(result => {
              this.${entityName}s.push(result);
      },error=>{
        console.log(error);
      });
      }


    update${(name)}(entity) {
      this.service.update(entity).subscribe(result => {
            console.log(result);
      },error=>{
        console.log(error);
      });
      }

    delete${(name)}(entity) {
      let deleteIndex = this.${entityName}s.indexOf(entity);
      this.service.delete(entity).subscribe(result => {
            console.log(result);
            this.${entityName}s.splice(deleteIndex, 1)
      },error=>{
        console.log(error);
      });
      }

    };`;
    }

    return template;

  }

}

module.exports = ComponentBuilder;
