import { Component } from '@angular/core';
import firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
   const config = {
     databaseURL: "https://oc-tp2.firebaseio.com",
   };
   firebase.initializeApp(config);
 }
}
