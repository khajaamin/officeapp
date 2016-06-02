import {ViewChild} from '@angular/core';
import {App, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {ListPage} from './pages/list/list';
import {AddNotePage} from './pages/add-note/add-note';

import {BlogsPage} from './pages/blogs/blogs';
import {AboutUsPage} from './pages/about-us/about-us';
import {UpgradesPage} from './pages/upgrades/upgrades';


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
    { title: 'Home', component: ListPage },
      { title: 'My Office Diary', component: HelloIonicPage },
      { title: 'About Us', component: AboutUsPage },
      { title: 'Blogs', component: BlogsPage },
      { title: 'Upgrades', component: UpgradesPage }
      
    ];




Date.prototype.formatDate = function (format) {
    var date = this,
        day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();

    if (!format) {
        format = "MM/dd/yyyy";
    }

    format = format.replace("MM", month.toString().replace(/^(\d)$/, '0$1'));

    if (format.indexOf("yyyy") > -1) {
        format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
        format = format.replace("yy", year.toString().substr(2, 2));
    }

    format = format.replace("dd", day.toString().replace(/^(\d)$/, '0$1'));

    if (format.indexOf("t") > -1) {
        if (hours > 11) {
            format = format.replace("t", "pm");
        } else {
            format = format.replace("t", "am");
        }
    }

    if (format.indexOf("HH") > -1) {
        format = format.replace("HH", hours.toString().replace(/^(\d)$/, '0$1'));
    }

    if (format.indexOf("hh") > -1) {
        if (hours > 12) {
            hours -= 12;
        }

        if (hours === 0) {
            hours = 12;
        }
        format = format.replace("hh", hours.toString().replace(/^(\d)$/, '0$1'));
    }

    if (format.indexOf("mm") > -1) {
        format = format.replace("mm", minutes.toString().replace(/^(\d)$/, '0$1'));
    }

    if (format.indexOf("ss") > -1) {
        format = format.replace("ss", seconds.toString().replace(/^(\d)$/, '0$1'));
    }

    return format;
};


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
                alert(JSON.stringify(error.err));
                
            });




          this.storage.query('CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, note_id INTEGER, comment TEXT, image TEXT, created_at TEXT, app_id INTEGER, user_id INTEGER)').then((data) => {
                console.log("comments TABLE CREATED -> " + JSON.stringify(data.res));
                
            }, (error) => {
                alert(JSON.stringify(error.err));
                
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
