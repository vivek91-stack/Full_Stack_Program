import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

// import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

// Routing Module
import { UserAuth } from './custom_validation/userAuth';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

//toaster 
// import { ToasterModule, ToasterService } from 'angular2-toaster/angular2-toaster';
import * as jquery from 'jquery';
import { SharedModule } from './custom-filter/shareModule';
import { CustomValidation } from './custom_validation/customValidation';
import { AppRoutingModule } from './app-routing.module';
// import { ChartsModule } from 'ng2-charts';
import { ToasterModule } from 'angular2-toaster';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { FileUploadModule } from 'ng2-file-upload';
// import { NgChartsModule } from 'ng2-charts';


@NgModule({
  imports: [
    BrowserModule,
    FileUploadModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    // ChartsModule,
    // NgChartsModule,
    ToasterModule,
    BsDropdownModule.forRoot(),
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    ToasterModule.forRoot()
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective
    ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }, UserAuth, CustomValidation],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

