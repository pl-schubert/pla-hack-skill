import { Component } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-root',
// templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'firestore-poc';
// }

interface Worker {
  vaccine: number
  name: string
  location: string
};

interface AggregatedInformations {
  locationName: string;
  totalVaccinated: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  workers$: Observable<Worker[]>;
  aggregations$: Map<string, AggregatedInformations>;
  totalVaccinated$: number = 0;
  selectedLocation: string;
  constructor(firestore: Firestore) {
    this.selectedLocation = this.locations[1];
    var workerscollection: any = collection(firestore, 'workers');
    this.workers$ = collectionData(workerscollection);
    this.workers$.subscribe(workers => {
      this.totalVaccinated$ = this.getTotalVaccinated(workers)
    })
  }

  getTotalVaccinated(workerCollection: Worker[]): Map<string, AggregatedInformations> {
    let aggregateMap: Map<string, AggregatedInformations> = new Map<string, AggregatedInformations>();
    var totalVaccinated: number = 0;
    for (let index in workerCollection) {
      let aggregatedInformations = aggregateMap.get(workerCollection[index].location);
      if (aggregatedInformations == null) {
        aggregatedInformations = {
          locationName: workerCollection[index].location,
          totalVaccinated: 0
        };
      }
      aggregatedInformations.totalVaccinated = +aggregatedInformations.totalVaccinated + +workerCollection[index].vaccine;
    }
    return totalVaccinated
  }
}
