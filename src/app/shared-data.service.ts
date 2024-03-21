import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private flightDetailsSubject = new BehaviorSubject<any>({});
  flightDetails$: Observable<any> = this.flightDetailsSubject.asObservable();

  updateFlightDetails(flightDetails: any): void {
    this.flightDetailsSubject.next(flightDetails);
  }
}
