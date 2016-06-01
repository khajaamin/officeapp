import {Platform,Page, NavController, NavParams,Storage, SqlStorage,FormBuilder} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';
import { NgForm }    from '@angular/common';
import {ListPage} from '../list/list';

@Page({
  templateUrl: 'build/pages/add-note/add-note.html',
  styleUrl:'style.css'
})
export class AddNotePage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }



  constructor(nav, navParams,platform) {





    this.nav = nav;
    this.note = {}; 

    this.platform = Platform; 
    this.notes = [];
    this.storage = new Storage(SqlStorage);
    this.refresh();
        
this.storage.query("DELETE FROM users"); 
    

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: this.icons[i]+ " "  + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
    
  }

  itemTapped(event, item) {
     this.nav.push(ItemDetailsPage, {
       item: item
     });
  }
  
  

   save(noteForm) {

         this.storage.query("INSERT INTO notes (case_stage, court_name,first_party_name,second_party_name) VALUES ('"+this.note.case_stage+"','"+this.note.court_name+"','"+this.note.first_party_name+"','"+this.note.second_party_name+"')").then((data) => {
                console.log('adde-new-note');
               this.nav.setRoot(ListPage);

            }, (error) => {
                console.log("ERROR -> " + JSON.stringify(error.err));
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
  
  
}
