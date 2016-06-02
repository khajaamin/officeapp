import {Platform,Page, NavController,Toast, NavParams,Storage, SqlStorage,FormBuilder} from 'ionic-angular';
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


    this.selectedNote = navParams.get('item');

    this.nav = nav;

    this.platform = Platform; 
    this.notes = [];
    this.storage = new Storage(SqlStorage);
    

      this.note = {}; 

        if( typeof this.selectedNote  != 'undefined')
        {
          
           this.storage.query("SELECT * FROM notes where id=" + this.selectedNote.id).then((data) => {
            
            if(data.res.rows.length > 0) {
                
                  for(var i = 0; i < data.res.rows.length; i++) {
                      
                      this.note = data.res.rows.item(i);
                  }
              }

            }, (error) => {
                console.log("ERROR -> " + JSON.stringify(error.err));
            });

        }
        else
        {

            this.note = {}; 
          
        }


    
  }

  itemTapped(event, item) {
     this.nav.push(ItemDetailsPage, {
       item: item
     });
  }
  
  

   save(noteForm) {

        this.msg = "";

        if(typeof this.note.id != 'undefined')
        {
            this.query = "UPDATE notes  SET case_stage = '"+this.note.case_stage+"',court_name='"+this.note.court_name+"',first_party_name='"+this.note.first_party_name+"',second_party_name='"+this.note.second_party_name+"',prious_date='"+this.note.prious_date+"',next_date='"+this.note.next_date+"'  WHERE id = "+ this.note.id; 
            this.msg = 'Awesome sir! Your have perfectly updated note.'; 
        }
        else
        {
          this.query = "INSERT INTO notes (case_stage, court_name,first_party_name,second_party_name,prious_date,next_date) VALUES ('"+this.note.case_stage+"','"+this.note.court_name+"','"+this.note.first_party_name+"','"+this.note.second_party_name+"','"+this.note.prious_date+"','"+this.note.next_date+"')"; 
            this.msg = 'Awesome sir! Your have perfectly added note.'; 
        }

         this.storage.query(this.query).then((data) => {

                 let toast = Toast.create({
                    message: this.msg,
                    duration: 3000
                  });
                  this.nav.present(toast);
               this.nav.setRoot(ListPage);

            }, (error) => {
                 let toast = Toast.create({
                    message: "ERROR: "+JSON.stringify(error.err),
                    duration: 2000
                  });
                  this.nav.present(toast);

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
  
    truncateNotes()
    {

        this.storage.query("DELETE FROM notes").then((data) => {
        }, (error) => {
                        console.log("ERROR -> " + JSON.stringify(error.err));
                    }); 
            

    }
  
}
