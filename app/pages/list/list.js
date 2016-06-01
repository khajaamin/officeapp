import {Page,Platform,Storage, MenuController, SqlStorage, NavController, NavParams} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';
import {AddNotePage} from '../add-note/add-note';


@Page({
  templateUrl: 'build/pages/list/list.html'

})
export class ListPage {
  static get parameters() {
    return [[NavController], [NavParams], [MenuController]];
  }

  constructor(nav, navParams,platform,menu) {
    this.nav = nav;
    this.searchQuery = ""; 
    this.menu = menu;

    this.platform = Platform; 
    this.notes = [];
    this.storage = new Storage(SqlStorage);
    this.refresh();



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
  
  

    refresh() {
            this.storage.query("SELECT * FROM notes").then((data) => {
                this.notes = [];
                if(data.res.rows.length > 0) {
                    for(var i = 0; i < data.res.rows.length; i++) {
                         this.notes.push(data.res.rows.item(i));
                    }
                }
            }, (error) => {
                console.log("ERROR -> " + JSON.stringify(error.err));
            });
        
    }


  openPage() {
    // close the menu when clicking a link from the menu
  
    // navigate to the new page if it is not the current page
    this.nav.setRoot(AddNotePage);
  }
  
}
