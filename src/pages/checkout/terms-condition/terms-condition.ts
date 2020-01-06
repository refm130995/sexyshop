import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Values } from '../../../providers/service/values';
import { CartPage } from '../../cart/cart';

@Component({
    templateUrl: 'terms-condition.html'
})
export class TermsCondition {
   

    constructor(public nav: NavController,
        public values: Values, ) {

    }

    getCart() {
        this.nav.push(CartPage);
    }


}