import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
// DataTable
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreditmgmtComponent } from './creditmgmt.component';
import { CreditmgmtRoutingModule } from './creditmgmt-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { CreditSettingsComponent } from './credit-settings.component';
//Service
import { CreditmgmtService } from './creditmgmt.services';
import { SharedModule } from '../custom-filter/shareModule';
import { CustomValidation } from '../custom_validation/customValidation';
import { UiSwitchModule } from 'ngx-toggle-switch';
// import { ModalModule } from 'ngx-bootstrap';
// import { NgProgressModule } from 'ngx-progressbar';
// import { ModalModule } from 'ngx-bootstrap/modal/public_api';


@NgModule({
  imports: [
    CreditmgmtRoutingModule,
    CommonModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // NgProgressModule,
    SharedModule,
    UiSwitchModule,
    // ModalModule.forRoot()
  ],
  declarations: [
    CreditmgmtComponent,
    CreditSettingsComponent
    //ScheduleFormComponent,
  ],
  providers: [
    CreditmgmtService,
    HttpClientModule,
    CustomValidation
  ],
})
export class CreditmgmtModule { }
