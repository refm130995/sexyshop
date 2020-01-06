import { Component } from '@angular/core';
import { NavController, NavParams  } from 'ionic-angular';
import { WishlistService } from '../../../providers/service/wishlist-service';
import { Values } from '../../../providers/service/values';
import { Functions } from '../../../providers/service/functions';
import { CartPage } from '../../cart/cart';
import { ProductPage } from '../../product/product';

@Component({
    templateUrl: 'wishlist.html'
})
export class WishlistPage {

    wishlist: any;
    error: any;
    
    constructor(public nav: NavController, public values: Values, public params: NavParams, public functions: Functions, public service: WishlistService) {

      this.service.loadWishlist()
            .then((results) => this.wishlist = results);
    }
    removeFromWishlist(id){
    	this.service.deleteItem(id)
        .then((results) => this.updateWish(results, id));
    }
    updateWish(results, id){
    if(results.status == "success"){
    	this.service.loadWishlist()
            .then((results) => this.wishlist = results);
            this.values.wishlistId.splice(id, 0);
        }
    }
  getCart() {
        this.nav.push(CartPage);
  }
  addToCart(id, type){
    if (type == 'variable') {
         this.nav.push(ProductPage, id);
        }
    else {
         this.service.addToCart(id)
        .then((results) => this.updateCart(results, id));
         }
   }
  updateCart(results, id){
    if(results.error){
         this.functions.showAlert("Hubo un problema", "No se puede agregar a la lista de deseos");
    }
    else{
       this.service.deleteItem(id)
        .then((results) => this.updateWishlist(results));     
    }
  }
  updateWishlist(results){
    this.service.loadWishlist()
            .then((results) => this.wishlist = results);
      this.functions.showAlert("Muy bien", "El producto ha sido agregado a la cesta de compras");
  }
}