import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddJobSuggestionComponent } from './addjobsuggestion.component';
import { EditJobSuggestionComponent } from './editjobsuggestion.component';


import { JobSuggestionmgmtComponent } from './jobsuggestionmgmt.component';

const routes: Routes = [
    {
      path: '',
      component: JobSuggestionmgmtComponent,
      data:{
      //  title: 'Addjob-List'
     },
    },
    {
        path: 'addjobsuggestion',
        component: AddJobSuggestionComponent,
        data:{
        // title: 'AddNewjob'
        },
    },
    {
      path: 'editjobsuggestion/:id',
      component: EditJobSuggestionComponent,
      data:{
      // title: 'AddNewjob'
      },
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddJobTypeRoutingModule {}
