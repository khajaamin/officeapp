import {Page,Platform, NavController, NavParams,Storage, SqlStorage} from 'ionic-angular';
import {ListPage} from '../list/list';
import {AddNotePage} from '../add-note/add-note';
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
    this.note = {};
    this.storage = new Storage(SqlStorage);
    this.refresh({id:this.selectedItem.id});
        
  }


  
    refresh(obj) {
            this.storage.query("SELECT * FROM notes where id="+ obj.id).then((data) => {
                this.notes = [];
                if(data.res.rows.length > 0) {
                  
                    for(var i = 0; i < data.res.rows.length; i++) {
                        
                        this.notes.push(data.res.rows.item(i));
                        this.note =data.res.rows.item(i);
                    }
                }


            }, (error) => {
                console.log("ERROR -> " + JSON.stringify(error.err));
            });
        
    }


    tapEvent(event,note)
    {

  		this.nav.setRoot(ListPage);
    }
  



  update(item) {
    this.nav.push(AddNotePage,{
       item: item
     });
  }


}
