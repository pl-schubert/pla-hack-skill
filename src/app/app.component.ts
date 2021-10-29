import { Component } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'firestore-poc';
// }

interface Worker {
  location: string
};

@Component({
  selector: 'app-root',
  template: `
  <ul>
    <li *ngFor="let item of item$ | async">
      {{ item.location }}
    </li>
  </ul>
  `
})
export class AppComponent {
  item$: Observable<Worker[]>;
  constructor(firestore: Firestore) {
    var collection2: any = collection(firestore, 'workers');
    this.item$ = collectionData(collection2);
  }
}
