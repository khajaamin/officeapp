import {Page,Platform, NavController, NavParams,Storage, SqlStorage} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/item-details/item-details.html'
})
export class ItemDetailsPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, navParams,platform) {
    this.nav = nav;
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');


    this.platform = Platform; 
    this.notes = [];
    this.storage = new Storage(SqlStorage);
    this.refresh();
        

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
