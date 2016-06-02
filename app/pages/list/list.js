import {Page,Loading,Platform,Storage,Toast,ItemSliding, MenuController, SqlStorage, NavController, NavParams} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';
import {AddNotePage} from '../add-note/add-note';
import {LocalNotifications} from 'ionic-native';
import {SpinnerDialog} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/list/list.html'

})
export class ListPage {
  static get parameters() {
    return [[NavController], [NavParams], [MenuController]];
  }

  constructor(nav, navParams,platform,menu,FormBuilder) {
      
this.isSearch = false; 




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
      this.selectedDate = this.date.formatDate('yyyy-MM-dd');


      this.items = [{"id":"12","court_name":"solapur","first_party_name":"attar","second_party_name":"Akshay"}];

  }

  itemTapped(event, item) {
     this.nav.push(ItemDetailsPage, {
       item: item
     });
  }
  
  
 addOneDay()
 {
   this.tempDate = new Date(this.selectedDate); 
  
    this.tempDate.setDate(this.tempDate.getDate() + 1) ; 
    this.selectedDate = this.tempDate.formatDate('yyyy-MM-dd'); 
    this.refresh();

 } 


removeOneDay()
 {
    this.tempDate = new Date(this.selectedDate); 
    this.tempDate.setDate(this.tempDate.getDate() - 1) ; 
    this.selectedDate = this.tempDate.formatDate('yyyy-MM-dd');
    this.refresh();
 } 


    refresh() {

         let loading = Loading.create({
            content: 'Loading',
            });
          this.nav.present(loading);

            this.storage.query("SELECT * FROM notes where next_date = '"+this.selectedDate+"'").then((data) => {
                this.notes = [];
                if(data.res.rows.length > 0) {
                    for(var i = 0; i < data.res.rows.length; i++) {
                         this.notes.push(data.res.rows.item(i));
                    }
                }
                
               loading.dismiss();

            }, (error) => {

               loading.dismiss();
                console.log("ERROR -> " + JSON.stringify(error.err));
            });



        
    }


  openPage() {
    // close the menu when clicking a link from the menu
  
    // navigate to the new page if it is not the current page
    this.nav.push(AddNotePage);
  }
 




  update(item) {
    
    this.nav.push(AddNotePage,{
       item: item
     });



  }



openSearch()
{

  this.isSearch = true; 


}

searchRefresh(event)
{
  console.log(this.searchQuery); 
  
}


onCancel ()
{
  this.isSearch = false;   
}

}
