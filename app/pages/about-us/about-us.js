import {Platform,Page, NavController,Toast, NavParams,Storage, SqlStorage,FormBuilder} from 'ionic-angular';
import {ItemDetailsPage} from '../item-details/item-details';
import { NgForm }    from '@angular/common';
import {ListPage} from '../list/list';
import {EmailComposer} from 'ionic-native';
@Page({
  templateUrl: 'build/pages/about-us/about-us.html',
  styleUrl:'style.css'
})
export class AboutUsPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }



  constructor(nav, navParams,platform) {


    this.nav = nav;

    this.platform = Platform; 
   
    this.storage = new Storage(SqlStorage);
    
  }

  itemTapped(event, item) {
     this.nav.push(ItemDetailsPage, {
       item: item
     });
  }
  
  sendMail()
  {


EmailComposer.isAvailable().then((available) =>{
 if(available) {
 
      let email = {
        to: 'khajaamin@gmail.com',
        cc: 'ajijattar147@gmail.com',
        //bcc: ['john@doe.com', 'jane@doe.com'],
        
        subject: 'Suggestion to improve myofficediary',
        body: 'Hey! hi Gauree,  Please improve features as bolow. ',
        isHtml: true
      };

      // Send a text message using default options
      EmailComposer.open(email);

  }
  else
  {
     alert("Email Composer not available!");
  }


});


  }

  
}
