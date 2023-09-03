import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { tagDataFilterPipe } from './tagitemdatafilterpipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
// Component
import { ItemTagsComponent } from './tagitems.component';

import { ItemtagRoutingModule } from './tagitemsrouting.module';
import { CustomValidation } from '../custom_validation/customValidation';

import { ItemtagsService } from './tagitems.services';

import { ToasterModule, ToasterService } from 'angular2-toaster/angular2-toaster';



@NgModule({
  imports: [
    ItemtagRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    ToasterModule
  ],
  declarations: [ItemTagsComponent,tagDataFilterPipe],
  providers: [
    CustomValidation,
    ItemtagsService,
    HttpClient
  ],
})
export class TagItemModule { }