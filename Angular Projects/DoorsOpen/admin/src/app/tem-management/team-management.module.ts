import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ToasterModule } from 'angular2-toaster';
import { TemManagementComponent } from './tem-management.component';
import { TeamManagementService } from './team-management.service';
import { TeamManagementRoutingModule } from './team-management-routing.module';
import { TeamMemberComponent } from './team-member/team-member.component';



@NgModule({
  declarations: [TemManagementComponent, TeamMemberComponent],
  imports: [
    TeamManagementRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    ToasterModule
  ],
  providers:[
    TeamManagementService,
    HttpClient
  ]
})
export class TeamManagementModule { }
