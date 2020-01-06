import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Service } from '../../providers/service/service';
import { Values } from '../../providers/service/values';
import { CartPage } from '../cart/cart';
import { ProductsPage } from '../products/products';
import { SearchPage } from '../search/search';
import { ProductPage } from '../product/product';
import { DemoPage } from '../demo/demo';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ProductService } from '../../providers/service/product-service';
import { Functions } from '../../providers/service/functions';



@Component({
    templateUrl: 'home.html'
})
export class Home {
    status: any;
    items: any;
    product: any;
    options: any;
    id: any;
    variationID: any;
    time: any;
    has_more_items: boolean = true;
    tabs:number = 1;
    postsShow: Array<any> = new Array<any>();
    constructor(
        public nav: NavController, 
        public service: Service, 
        public values: Values, 
        private iab: InAppBrowser,
        public service_product: ProductService, 
        public functions: Functions
    ) {
        this.items = [];
        this.options = [];
        this.service.getProducts();
        this.filter(null);
        console.log(this.service.products)
    }

    getCategory(id, slug, name) {
        this.items.id = id;
        this.items.slug = slug;
        this.items.name = name;
        this.items.categories = this.service.categories;
        this.nav.setRoot(ProductsPage, this.items);
    }

    getCart() {
        this.nav.push(CartPage);
    }

    getSearch() {
        this.nav.push(SearchPage);
    }
    mySlideOptions = {
        initialSlide: 1,
        loop: true,
        autoplay: 5800,
        pager: true
    }

    addToWishlist(id) {
        console.log(this.service.products.products)
        console.log(this.values.wishlistId)
        if (this.values.isLoggedIn) {
            this.service_product.addToWishlist(id).then((results) => this.update(results, id));
        } else {
            this.functions.showAlert("Mensaje", "Debes iniciar sesión para poder agregar este producto a favoritos");
        }
    }

    removeFromWishlist(id) {
        this.values.wishlistId[id] = false;
        this.service_product.deleteItem(id).then((results) => this.updateWish(results, id));
    }

    update(a, id) {
        if (a.success == "Success") {
            //this.functions.showAlert(a.success, a.message);
            this.values.wishlistId[id] = true;
        } else {
            this.functions.showAlert("error", "error");
        }
    }

    getId() {
        var i;
        if (this.options.length >= 1)
            var resa = this.options[0].split(":");
        if (this.options.length >= 2)
            var resb = this.options[1].split(":");
        if (this.options.length >= 1)
            for (i = 0; i < this.product.product.variations.length; i++) {
                if (this.product.product.variations[i].attributes[0].option == resa[1]) {
                    if (this.options.length == 1) {
                        break;
                    }
                    else if (this.product.product.variations[i].attributes[1].option == resb[1]) {
                        break;
                    }
                }
            }
    }

    doInfinite(infiniteScroll) {
        this.service.loadMore().then((results) => this.handleMore(results, infiniteScroll));
    }

    handleMore(results, infiniteScroll) {
        if (!results) {
            this.has_more_items = false;
        }
        infiniteScroll.complete();
    }
    
    getProduct(id) {
        this.nav.push(ProductPage, id);
    }

    goDemo(){
        this.nav.push(DemoPage);
    }

    goFlow(){
   /*      let url: string = 'https://api.flow.cl';
        const browser = this.iab.create(); */
    }

    updateWish(results, id) {
        if (results.status == "success") {
            this.values.wishlistId[id] = false;
        }
    }

    filter(category){
        if(category){
            this.service.products.products
        }else{

            this.postsShow =  this.service.products;
        }
    }
}