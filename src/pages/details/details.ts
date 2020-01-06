import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CartPage } from '../cart/cart';
import { SearchPage } from '../search/search';
import { Home } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  notice: any;
  title:any;
  alert: any;
  mensaje  = 'Hola, te recomiendo descargar la app móvil de sexyshop.cl, está buenísima! Podrás realizar compras, leer artículos de sexualidad, entre otros, es muy fácil, entra en el enlace ';
  imagen = 'https://sexyshop.cl/wp-content/uploads/2018/07/logo-290.png';
  url = 'https://sexyshop.cl/app';
  constructor(public navCtrl: NavController, public navParams: NavParams,  public socialSharing: SocialSharing,  public toastCtrl: ToastController,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController,) {
    this.notice = this.navParams.get('noticia')
      console.log('Noticia que llega::> ',this.notice)
     
    }
  
    ionViewDidLoad() {
      console.log('ionViewDidLoad SharePage');
    }

    goHome(){
      this.navCtrl.push(Home);
    }
  
    shareFacebook(mensaje, imagen, url){
      this.msgLoading('Cargando Facebook');
  
      
      console.log('Share Facebook::> ',mensaje, imagen, url);
      this.socialSharing.shareViaFacebook(this.mensaje, this.imagen, this.url)
          .then(data => {
            console.log('ShareFacebook:THEN:>data ', data);
           
          })
          .catch(err => {
            console.log('ShareFacebook:CATCH:>err', err);
            this.msgAlert('No tienes Facebook instalado','Debes tener la App de Facebook instalada para poder compartir este contenido');
          });
    }
    
    shareTwitter(mensaje, imagen, url){
      this.msgLoading('Cargando Twitter');
  
      this.socialSharing.shareViaTwitter(mensaje, imagen, url).then(data => {
        console.log('shareTwitter:THEN:>data ', data);
        // this.msgLoading('Cargando Twitter');
      })
      .catch(err => {
        console.log('shareTwitter:CATCH:>err', err);
        //this.msgAlert('No tienes Twitter instalado','Debes tener la App de Twitter instalada para poder compartir este contenido');
      });
      // console.log('Share Twitter::> ',this.mensaje, this.imagen, this.url);
    }  
    
    shareInstagram(mensaje, imagen){
  
      this.socialSharing.shareViaInstagram(mensaje, imagen).then(data => {
        console.log('shareInstagram:THEN:>data ', data);
        this.msgLoading('Cargando Instagram');
      })
      .catch(err => {
        console.log('shareInstagram:CATCH:>err', err);
        this.msgAlert('No tienes Instagram instalado','Debes tener la App de Instagram instalada para poder compartir este contenido');
      });
      // console.log('Share Instagram::> ',this.mensaje, this.imagen) this.;
    }
    
    shareWhatsapp(mensaje, imagen, url){
  
      this.socialSharing.shareViaWhatsApp(mensaje, imagen, url).then(data => {
        console.log('shareWhatsapp:THEN:>data ', data);
        this.msgLoading('Cargando Whatsapp');
      })
      .catch(err => {
        console.log('shareWhatsapp:CATCH:>err', err);
        this.msgAlert('No tienes Whatsapp instalado','Debes tener la App de Whatsapp instalada para poder compartir este contenido');
      });
      // console.log('Share Whatsapp::> ',this.mensaje, this.imagen, this.url);
    }
  
    msgLoading(msg){
      let loading = this.loadingCtrl.create({
          content: `<img src="assets/image/Loading.gif" />`,
          duration: 3000,
          spinner: 'hide',
          showBackdrop: false,
          cssClass: 'cargadorNegro'
      });
      loading.present();
    }
    
    msgAlert(msg, seg){
  
      const toast = this.toastCtrl.create({
          message: msg,
          duration: seg * 1000,
          position: 'top'
        });
        toast.present();
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
}
