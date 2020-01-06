import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CartPage } from '../cart/cart';
import { SearchPage } from '../search/search';
import { WordpressProvider } from './../../providers/wordpress/wordpress';
import { NativeStorage } from '@ionic-native/native-storage';


@IonicPage()
@Component({
  selector: 'page-share',
  templateUrl: 'share.html',
  providers: [WordpressProvider]
})
export class SharePage {
  alert:any;
  elemento: string = 'pages';
  idPage: string = '2912';
  datos: any;
  cargando: string = 'Cargando';
  contenidoPage: any;
  fondoPage: any;
  mensaje  = 'Hola, te recomiendo descargar la app móvil de sexyshop.cl, está buenísima! Podrás realizar compras, leer artículos de sexualidad, entre otros, es muy fácil, entra en el enlace ';
  imagen = 'https://sexyshop.cl/wp-content/uploads/2018/07/logo-290.png';
  url = 'https://sexyshop.cl/app';
  cupones: any;
  muestraCupon: boolean = false;
  cuponDescuento: string = 'TEST';
  loader: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public socialSharing: SocialSharing,
    public toastCtrl: ToastController,
    public wp: WordpressProvider,
    public alertCtrl: AlertController,
    private storage: NativeStorage
    ) {
  }

  ionViewWillEnter(){
    this.msgLoading('Cargando');
  }

  ionViewDidLoad() {

this.datosPage(this.elemento, this.idPage, this.cargando);
this.cupon();

this.storage.getItem('cupopn').then((val) => {

  if(val === true){
    this.muestraCupon = true;
  }
  console.log('Your Strorage is', val);
});

  }

  shareFacebook(){
    this.msgLoading('Cargando Facebook');

    
    console.log('Share Facebook::> ',this.mensaje, this.imagen, this.url);
    this.socialSharing.shareViaFacebook(this.mensaje, this.imagen, this.url)
        .then(data => {
          console.log('ShareFacebook:THEN:>data ', data);
          setInterval(() => {
            this.showCupon()
          }
          ,5000);  
        })
        .catch(err => {
          console.log('ShareFacebook:CATCH:>err', err);
          this.msgAlert('No tienes Facebook instalado, debes tener la App de Facebook instalada para poder compartir este contenido');
        });
  }
  
  shareTwitter(){
    this.msgLoading('Cargando Twitter');

    this.socialSharing.shareViaTwitter(this.mensaje, this.imagen, this.url).then(data => {
      console.log('shareTwitter:THEN:>data ', data);
      this.msgLoading('Cargando Twitter');
      setInterval(() => {
        this.showCupon()
      }
      ,5000);  
    })
    .catch(err => {
      console.log('shareTwitter:CATCH:>err', err);
      this.msgAlert('No tienes Twitter instalado, debes tener la App de Twitter instalada para poder compartir este contenido');
    });
    // console.log('Share Twitter::> ',this.mensaje, this.imagen, this.url);
  }  
  
  shareInstagram(){

    this.socialSharing.shareViaInstagram(this.mensaje, this.imagen).then(data => {
      console.log('shareInstagram:THEN:>data ', data);
      this.msgLoading('Cargando Instagram');
      setInterval(() => {
        this.showCupon()
      }
      ,5000);  
    })
    .catch(err => {
      console.log('shareInstagram:CATCH:>err', err);
      this.msgAlert('No tienes Instagram instalado, debes tener la App de Instagram instalada para poder compartir este contenido');
    });
    // console.log('Share Instagram::> ',this.mensaje, this.imagen) this.;
  }
  
  shareWhatsapp(){


    this.socialSharing.shareViaWhatsApp(this.mensaje, this.imagen, this.url).then(data => {
      console.log('shareWhatsapp:THEN:>data ', data);
      this.msgLoading('Cargando Whatsapp');
      setInterval(() => {
        this.showCupon()
      }
      ,5000);  
    })
    .catch(err => {
      console.log('shareWhatsapp:CATCH:>err', err);
      this.msgAlert('No tienes Whatsapp instalado, debes tener la App de Whatsapp instalada para poder compartir este contenido');
    });
    // console.log('Share Whatsapp::> ',this.mensaje, this.imagen, this.url);



  }

  msgLoading(msg){
    this.loader = this.loadingCtrl.create({
        content: msg,
        duration: 3000,
        spinner: 'crescent',
        showBackdrop: true
    });
    this.loader.present();
  }
  

  msgAlert(msg){

    const toast = this.toastCtrl.create({
        message: msg,
        duration: 3000,
        position: 'top'
      });
      toast.present();
}

cupon() {
  this.wp.getListbyPostType('shop_coupon').subscribe(data => {
        this.cupones = data;
        this.filtro();
      });
   


}

filtro() {
  let c = this.cupones.find(a => a.id === 2987);
  this.cuponDescuento = c.title.rendered;
}

showCupon(){

  this.storage.setItem('cupon', true);


  this.muestraCupon = true;

}

  codeAlert(code){

    this.alert = this.alertCtrl.create({
      title: 'Codigo de descuento',
      subTitle: 'a2s1d31s321ads',
      buttons: ['Cancelar']
    });
    this.alert.present();
  }

getCart() {
  this.navCtrl.push(CartPage);
}

getSearch() {
  this.navCtrl.push(SearchPage);
}

datosPage(elemento, ID, msg){

  this.wp.getItem(elemento, ID).subscribe(
    data => { this.loader.dismiss();
      this.datos = [data];
      // this.contenidoPage = data.content.rendered;
      this.fondoPage = data['better_featured_image']['source_url'];
      //loading.dismiss();
      //let bioStr = JSON.stringify(this.datos);
      //this.storage.set(this.strCargaBiografia, bioStr);
      console.log("FondoPage:: ", this.fondoPage);
      console.log("Content WP:: ", this.contenidoPage);
      
    }
  );
}
}
