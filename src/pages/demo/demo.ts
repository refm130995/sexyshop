import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';


@IonicPage()
@Component({
  selector: 'page-demo',
  templateUrl: 'demo.html',
})
export class DemoPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private vibration: Vibration) {
  }
     
  ionViewDidLoad() {
    console.log('ionViewDidLoad DemoPage');
  }

  onVibracion(){
    this.vibration.vibrate([10000]);
  }

  offVibracion(){
    this.vibration.vibrate(0);
  }

}
