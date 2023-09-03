import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
// DataTable

import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { AddJobTypeRoutingModule } from './jobsuggestionmgmt-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { ColorPickerModule } from 'ngx-color-picker';
//Service
import { AddJobTypemgmtService } from './jobsuggestionmgmt.services';
import { ToasterModule } from 'angular2-toaster';
import { JobSuggestionmgmtComponent } from './jobsuggestionmgmt.component';
import { AddJobSuggestionComponent } from './addjobsuggestion.component';
import { EditJobSuggestionComponent } from './editjobsuggestion.component';


@NgModule({
  imports: [
    AddJobTypeRoutingModule,
    CommonModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // DataTablesModule,
    ColorPickerModule,
    ToasterModule
  ],
  declarations: [
    JobSuggestionmgmtComponent,
    AddJobSuggestionComponent,
    EditJobSuggestionComponent
  ],
  providers: [
    AddJobTypemgmtService,
    HttpClientModule,
  ],
})
export class AddJobTypemgmtModule { }
