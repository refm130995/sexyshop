import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the FlowProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FlowProvider {

  constructor(public http: HttpClient) {
   
  }

  pagar(){
    let url = 'https://www.flow.cl/api/payment/create';
    //this.http.post(url);
  }

}
