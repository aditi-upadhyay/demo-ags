import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedDataService } from 'src/app/shared-data.service';
@Component({
  selector: 'app-form-controls',
  templateUrl: './form-controls.component.html',
  styleUrls: ['./form-controls.component.css'],
})
export class FormControlsComponent {
  constructor(private sharedDataService: SharedDataService) {}
  
  onSave(data: NgForm) {
    console.log('on Save', data);
    this.sharedDataService.updateFlightDetails(data);

  }
  onReset(form: NgForm) {
    console.log("onReset triggered",form)
    form.resetForm(); 
    this.sharedDataService.updateFlightDetails({});

  }
}
