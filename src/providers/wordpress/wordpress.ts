import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WpData } from '../../interfaces/wp.data';
/*
  Generated class for the WordpressProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WordpressProvider {

 WP_URL = 'https://sexyshop.cl/wp-json/wp/v2/';

  constructor(public http: HttpClient) {

  }

  
  getList(elemento){
    return this.http.get<any[]>(this.WP_URL + `${elemento}/?per_page=100`);
  }

  getListbyId(elemento, idCategoria, page: number = 1, perPage: number = 20){
    return this.http.get<WpData[]>(this.WP_URL + `${elemento}/?categories=${idCategoria}&page=${page}&per_page=${perPage}`);
  }

  getListbyType(elemento, page: number = 1, perPage: number = 20){
    return this.http.get<WpData[]>(this.WP_URL + `${elemento}?page=${page}&per_page=${perPage}`);
  }

  getListCatbyId(idCategoria){
    return this.http.get<any[]>(this.WP_URL + `categories/?parent=${idCategoria}&per_page=100`);
  }

  getListbyPostType(postType){
    return this.http.get<any[]>(this.WP_URL + `${postType}/?per_page=100`);
  }

  getItem(elemento,ID){
    return this.http.get<any[]>(this.WP_URL + `${elemento}/${ID}`);
  }

  getItemByUrl(url){

    let rand: number = Math.floor((Math.random() * 300000) + 1);

  /*   let headers = new HttpHeaders({
      'Cache-Control': 'no-cache'
    }); */
    return this.http.get<any>(url + '?x=' + rand);
   //return this.http.get<any>(url + '?x=' + rand, {headers: headers});
  }

}
