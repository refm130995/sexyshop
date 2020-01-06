// import { TextosProvider } from './../../providers/textos/textos';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { SoporteProvider } from './../../providers/soporte/soporte';
import { Home } from './../home/home';
import { CallNumber } from '@ionic-native/call-number';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Service } from '../../providers/service/service';
import { Values } from '../../providers/service/values';
import { CartPage } from '../cart/cart';

/**
 * Generated class for the SoportePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-soporte',
  templateUrl: 'soporte.html',
})
export class SoportePage {

  myFormSop: FormGroup;
  profile: any[] = [];
  name: string = '';
  phone: string = '';
  emailTX: string = '';
  message: string = '';
  tituloTx: string = '';
  textoTx: string = '';
  vista: string = 'formulario';
  telefonoTx: string = '+56988886427';
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9-]+\\.[a-z]{2,20}$';
  addresses: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private soporte: SoporteProvider,
    private callNumber: CallNumber,
    // private textos: TextosProvider,
    public fb: FormBuilder,
    public loadingCtrl: LoadingController,
    public service: Service,
    public values: Values
  ) {
    this.myFormSop = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(36)])],
     phone: ['', Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(20)])],
      emailTX: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.email, Validators.pattern(this.emailPattern)])],
      message: ['']
     
    });
  }

  ngOnInit() {
    this.service.getAddress()
    .then((results) => {this.addresses = results  
      console.log(this.addresses);
      if(results){
        this.name = this.addresses.customer.billing_address.first_name+" "+this.addresses.customer.billing_address.last_name;
        this.phone = this.addresses.customer.billing_address.phone;
        this.emailTX = this.addresses.customer.billing_address.email;
      }
    });
    }

  
    getCart() {
      this.navCtrl.push(CartPage);
  }



  doCall(phone) {
    this.callNumber.callNumber(phone, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

  sendEmail() {
    this.cargando();
    let data = {
      email: this.emailTX,
      nombre: this.name,
      mensaje: this.message,
      phone: this.phone
    }
    this.soporte.send(data)
      .subscribe(res => {
        //console.log('Email sent', res);
        this.showConfirm();
      });


  }
  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Mensaje enviado satisfactoriamente',
      message: 'Te contactaremos a la brevedad posible',
      buttons: [
        {
          text: 'Cerrar',
          handler: () => {
            this.navCtrl.push(Home);
          }
        }

      ]
    });
    confirm.present();
  }


  cargando() {
    let loader = this.loadingCtrl.create({
      content: "Por favor espere",
      duration: 3000
    });
    loader.present();
  }

  goHome(){
    this.navCtrl.setRoot( Home );
  }


}
