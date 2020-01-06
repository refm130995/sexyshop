import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Service } from '../../providers/service/service';
import { ListPage } from '../list/list';
import { Values } from '../../providers/service/values';
import { CartPage } from '../cart/cart';
import { SearchPage } from '../search/search';
import { Home } from '../home/home';

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {
  categories: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: Service, public values: Values, ) {
   /*  this.service.getProducts(); */
  }

  ionViewDidLoad() {
    this.getCategories();
   /*  this.service.getProducts(); */
  }

  getCart() {
    this.navCtrl.push(CartPage);
}

goHome(){
  this.navCtrl.push(Home);
}

getSearch() {
  this.navCtrl.push(SearchPage);
}

  getCategories(){
   this.service.getCategories().then((results)=>{
    this.categories = results
    console.log('categorías::> ',this.categories)
   }); 
  }

  goListaTips(id){
    this.navCtrl.push(ListPage,{
      id:id
    })
  }
}
