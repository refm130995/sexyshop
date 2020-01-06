import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Home } from '../pages/home/home';
import { Service } from '../providers/service/service';
import { Values } from '../providers/service/values';
import { Config } from '../providers/service/config';
import { TranslateService } from '@ngx-translate/core';
import { OneSignal } from '@ionic-native/onesignal';
import { ProductsPage } from '../pages/products/products';
import { CartPage } from '../pages/cart/cart';
import { AccountLogin } from '../pages/account/login/login';
import { Address } from '../pages/account/address/address';
import { Orders } from '../pages/account/orders/orders';
import { AccountRegister } from '../pages/account/register/register';
import { WishlistPage } from '../pages/account/wishlist/wishlist';
import { ProductPage } from '../pages/product/product';
import { Post } from '../pages/post/post';
import { AppRate } from '@ionic-native/app-rate';
import { SocialSharing } from '@ionic-native/social-sharing';
import { EmailComposer } from '@ionic-native/email-composer';
import { SoportePage } from '../pages/soporte/soporte';
import { SharePage } from '../pages/share/share';
import { CategoriesPage } from '../pages/categories/categories';
import { ListPage } from '../pages/list/list';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    // rootPage: any = ListPage;
    rootPage: any = Home;
    status: any;
    items: any = {};
    dropdown:boolean = false;
    buttonLanguagesSettings: boolean = false;
    constructor(public loadingCtrl: LoadingController, 
        public toastCtrl: ToastController,
        statusBar: StatusBar, splashScreen: SplashScreen, public alertCtrl: AlertController, public config: Config, private oneSignal: OneSignal, private emailComposer: EmailComposer, private appRate: AppRate, public platform: Platform, public service: Service, public values: Values, public translateService: TranslateService, private socialSharing: SocialSharing) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
            this.platform.setDir(this.config.appDir, true);
            this.translateService.setDefaultLang(this.config.language);
            this.service.load().then((results) => {});
            console.log(this.service)
            if (platform.is('cordova')) {
                this.oneSignal.startInit(this.config.oneSignalAppId, this.config.googleProjectId);
                this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
                this.oneSignal.handleNotificationReceived().subscribe(result => {
                    console.log(result);
                });
                this.oneSignal.handleNotificationOpened().subscribe(result => {
                    if (result.notification.payload.additionalData.category) {
                        this.items.id = result.notification.payload.additionalData.category;
                        this.nav.push(ProductsPage, this.items);
                    } else if (result.notification.payload.additionalData.product) {
                        this.items.id = result.notification.payload.additionalData.product;
                        this.nav.push(ProductPage, this.items.id);
                    } else if (result.notification.payload.additionalData.post) {
                        this.items.id = result.notification.payload.additionalData.post;
                        this.post(this.items.id);
                    }
                });
                this.oneSignal.endInit();
            }
        });
    }
    openPage(page) {
        this.nav.setRoot(page);
    }
    getCategory(id, slug, name) {
        this.items = [];
        this.items.id = id;
        this.items.slug = slug;
        this.items.name = name;
        this.items.categories = this.service.categories;
    
        this.nav.setRoot(ProductsPage, this.items);
    }
    getCart() {
        this.nav.setRoot(CartPage);
    }
    logout() {
        this.service.logout();
        this.values.wishlistId = [];
        this.mensaje('Gracias por visitarnos, vuelve pronto',3);
    }
    login() {
        this.nav.setRoot(AccountLogin);
    }
    categorias(){
        this.nav.setRoot(CategoriesPage)
    }
    register() {
        this.nav.setRoot(AccountRegister);
    }
    address() {
        this.nav.setRoot(Address);
    }
    order() {
        this.nav.setRoot(Orders);
    }
    cart() {
        this.nav.setRoot(CartPage);
    }
    wishlist() {
        this.nav.setRoot(WishlistPage);
    }
    shop() {
       // this.nav.setRoot(Home);
        if(this.dropdown)
        this.dropdown = false;
        else this.dropdown = true;
    }
    rateApp() {
        this.appRate.preferences.storeAppURL = {
            ios: this.config.appRateIosAppId,
            android: this.config.appRateAndroidLink,
            windows: 'ms-windows-store://review/?ProductId=' + this.config.appRateWindowsId
        };
        this.appRate.promptForRating(true);
    }
    shareApp() {
     this.nav.setRoot(SharePage)
    }
    

  
  
  msgAlert(title, subtitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['Aceptar']
    });
    alert.present();
  }
  
  msgLoading(msg){
    let loading = this.loadingCtrl.create({
        content: `<img src="assets/image/Loading.gif" />`,
        duration: 3000,
        spinner: 'hide',
        showBackdrop: false,
        cssClass: 'cargador'
    });
    loading.present();
  }

  mensaje(msg, seg){

    const toast = this.toastCtrl.create({
        message: msg,
        duration: seg * 1000,
        position: 'top'
      });
      toast.present();

}
  
    contact() {
       this.nav.setRoot(SoportePage);
    }
    post(id) {
        this.nav.setRoot(Post, id);
    }
}