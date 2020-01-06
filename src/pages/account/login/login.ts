import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Service } from '../../../providers/service/service';
import { Functions } from '../../../providers/service/functions';
import { Values } from '../../../providers/service/values';
import { Home } from '../../home/home';
import { AccountForgotten } from '../forgotten/forgotten';
import { AccountRegister } from '../register/register';

@Component({
    templateUrl: 'login.html'
})
export class AccountLogin {
    loginData: any;
    loadLogin: any;
    status: any;
    error: any;
    nonce: any;
    public disableSubmit: boolean = false;
    buttonText: any;
    constructor(public nav: NavController, 
        public service: Service, 
        public functions: Functions, 
        public values: Values,
        public toastCtrl: ToastController) {
        this.loginData = {};
        this.buttonText = "Login";
        this.service.getNonce()
            .then((results) => this.nonce = results);
    }


    login() {
        if (this.validateForm()) {
            this.disableSubmit = true;
            this.buttonText = "Logging In...";
            this.service.login(this.loginData)
                .then((results) => this.handleResults(results));
        }
    }


    validateForm() {
        if (this.loginData.username == undefined || this.loginData.username == "") {
            return false
        }
        if (this.loginData.password == undefined || this.loginData.password == "") {
            return false
        }
        else {
            return true
        }
    }


    handleResults(results) {
        this.disableSubmit = false;
        this.buttonText = "Entrar";

        
        if (!results.errors) {
            this.mensaje('Bienvenido, disfruta de la tienda', 3);
            this.nav.setRoot(Home);
        }
        else if (results.errors) {
            this.mensaje('Tu correo o clave son incorrectos, por favor revisa que esté todo bien escrito', 5);
        }
    }


    forgotten(loginData) {
        this.nav.push(AccountForgotten);
    }


    goRegister(){
        this.nav.push(AccountRegister);
    }


    mensaje(msg, seg){

        const toast = this.toastCtrl.create({
            message: msg,
            duration: seg * 1000,
            position: 'top'
          });
          toast.present();

    }
}