'use strict';
let writer = require('./../common/Writer.js');
let JavaScriptGenerator = require('./../common/JavaScriptGenerator.js');

class ServiceBuilder {
  constructor(name, url, crudType) {
    this.name = name;
    this.url = url;
  }

  createTemplate() {
    writer.writeTemplate(`${this.name}Service.js`,`${this.name}`, this._getTemplate());
  }

  _getTemplate() {
let template = `
 import { Injectable } from '@angular/core';
 import { Response, Headers, RequestOptions } from '@angular/http';
 import { Observable } from 'rxjs/Observable';

 import 'rxjs/add/operator/map';
 import 'rxjs/add/operator/catch';

 @Injectable()

 export class ${JavaScriptGenerator.getPascalCamelCaseName(this.name)}Service {
    private apiUrl = '${this.url}/${this.name}';

    constructor(private httpClient: HttpClient) { 
    }
    
    ${this._getCRUDMethods(this.name)}

  }
    
    `;
    
    
    return template;
  }

  _getCRUDMethods(entityName) {
    let template = '';
    if (entityName) {
      let entity = `${JavaScriptGenerator.getPascalCamelCaseName(entityName)}`;
      template = `
    save${entity}(entity: any): Observable<any> {
        return this.httpClient.post(this.apiUrl, JSON.stringify(entity))
            .map((response: Response) => <any>response.json())
            .catch(this.handleError)
    }

     update${entity}(entity): Observable<any> {
        return this.httpClient.put(this.apiUrl +  '/' + entity.id, JSON.stringify(entity))
            .map((response: Response) => <any>response.json())
            .catch(this.handleError)
    }

    delete${entity}(id): Observable<any> {
        return this.httpClient.delete(this.apiUrl + "/" + id)
            .map((response: Response) => response)
            .catch(this.handleError)
    }

    get${entity}(): Observable<any[]> {
        return this.httpClient.get(this.apiUrl)
            .map((response: Response) => response)
            .catch(this.handleError)
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
                return Observable.throw(error.json());
    }

`;
    }

    return template;

  }
}

module.exports = ServiceBuilder;
