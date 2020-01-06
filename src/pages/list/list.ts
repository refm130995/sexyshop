import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { Service } from '../../providers/service/service';
import { CartPage } from '../cart/cart';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  @ViewChild(Content) content: Content;
  notices: any;
  id: any;
  buscadorPlace: string = 'Buscar...';
  buscar: string = 'Buscar...';
  searchText = '';
  showfilters:boolean=false;
  mostrar_search: boolean;
  posts: Array<any> = new Array<any>();
  postsShow: Array<any> = new Array<any>();


  constructor(public navCtrl: NavController, public navParams: NavParams, public service: Service) {
   this.id = this.navParams.get('id')
  }

  ionViewDidLoad() {
   this.service.getNotices(this.id).then((results)=>{
    this.notices = results;
    this.filtrar();
    console.log('Noticias x categoría::> ',this.notices);
   }); 
  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  showSearch() {
    this.scrollToTop();
    this.showfilters = false;
    this.mostrar_search = true;
  }

  hideSearch() {
    this.showfilters = false;
    this.mostrar_search = false;
  }

  getCart() {
    this.navCtrl.push(CartPage);
  }

  filtrar() {
    // console.log('filtrar>searchText', this.searchText);
    
    let buscar = RegExp(this.searchText, 'i');
    if (this.searchText) {
      this.postsShow = this.notices.filter(p => buscar.test(p.title.rendered));
      console.log(this.postsShow)
    } else {
      this.postsShow = this.notices;
      console.log(this.postsShow)
    }
  }

  goDetail(notice){

    console.log('Notice::> ',notice);
    
    this.navCtrl.push(DetailsPage,{
      noticia: notice
    })
  }
}
