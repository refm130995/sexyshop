import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';

const appKey = 'HYSO-KOTS-8337-OSUJYRTW-9075387-GJR64HY';

@Injectable()
export class SoporteProvider {

  constructor(public http: HttpClient) {

  }

  send(param) {
    //let headers = new Headers({ 'X-Api-Key': appKey });
    // let opts = new RequestOptions({ 'headers': headers }); 
    return this.http
        .post('https://webservice.appi.cl/sexyshop/1.0/support.json.php', param, {
          headers: new HttpHeaders().
            set('X-Api-Key', appKey)
        })
        .map( res => {
          let body = res;
          if( body['status'] == "Ok" )
            return body['Email'];
          if( body['status'] == "Error" ) {
          }
        } );
  }



}
