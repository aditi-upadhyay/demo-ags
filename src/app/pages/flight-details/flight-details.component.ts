import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../components/modal/modal.service';
import { SharedDataService } from 'src/app/shared-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})

export class FlightDetailsComponent implements OnInit {
  flightDetails: any = {};

  constructor(
    private modalService: ModalService,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.sharedDataService.flightDetails$.subscribe(
      (flightDetails) => (this.flightDetails = flightDetails)
    );
  }

  openModal(): void {
    this.modalService.openModal();
  }
}