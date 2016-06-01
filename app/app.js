import {ViewChild} from '@angular/core';
import {App, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {ListPage} from './pages/list/list';
import {AddNotePage} from './pages/add-note/add-note';

import {Storage, SqlStorage} from 'ionic-angular';
@App({
  templateUrl: 'build/app.html',
  config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
  queries: {
    nav: new ViewChild('content')
  }
})
class MyApp {
  static get parameters() {
    return [[Platform], [MenuController]];
  }

  constructor(platform, menu) {

    this.platform = platform;
    this.menu = menu;
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'My Office Diary', component: HelloIonicPage },
      { title: 'My Note List', component: ListPage },
      { title: 'Add Note', component: AddNotePage }
    ];

    // make HelloIonicPage the root (or first) page
    this.rootPage = ListPage;
  }

  initializeApp() {

    this.platform.ready().then(() => {
      console.log("in ready");

    this.storage = new Storage(SqlStorage);

            this.storage.query('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, prious_date TEXT, court_name TEXT, first_party_name TEXT, second_party_name TEXT, next_date TEXT, user_id INTEGER, app_id INTEGER, case_stage TEXT)').then((data) => {
                console.log("TABLE CREATED -> " + JSON.stringify(data.res));
                
            }, (error) => {
                console.log("ERROR -> " + JSON.stringify(error.err));
                
            });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
