import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FlightDetailsComponent } from './pages/flight-details/flight-details.component';
import { FormControlsComponent } from './components/form-controls/form-controls.component';
import { ModalComponent } from './components/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreviewComponent } from './pages/preview/preview.component';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FlightDetailsComponent,
    FormControlsComponent,
    ModalComponent,
    PreviewComponent,
  ],
  imports: [
    BrowserModule, 
    FormsModule, MatDialogModule, 
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
