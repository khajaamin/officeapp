import {Page, NavController, NavParams} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';
import {AddNotePage} from '../add-note/add-note';


@Page({
  templateUrl: 'build/pages/list/list.html'
})
export class ListPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, navParams) {
    this.nav = nav;

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

this.date =  new Date();
this.AddNotePage = {title:"Add Note",component:AddNotePage};
this.selectedDate = this.date.getDate()+"/"+ this.date.getMonth() +"/"+ this.date.getFullYear(); 

    this.items = [{"id":"12","court_name":"solapur","first_party_name":"attar","second_party_name":"Akshay"}];

  }

  itemTapped(event, item) {
     this.nav.push(ItemDetailsPage, {
       item: item
     });
  }
  
  
   openPage(page) {
       console.log("openpage");
  }
  
}
