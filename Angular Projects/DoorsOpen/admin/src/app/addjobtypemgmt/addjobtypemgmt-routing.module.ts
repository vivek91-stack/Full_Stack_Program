import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddJobTypemgmtComponent } from './addjobtypemgmt.component';
import { AddNewJobTypeComponent } from './addnewjobtype.component'
import { EditJobTypeComponent } from './editjobtype-details.component';

const routes: Routes = [
    {
      path: '',
      component: AddJobTypemgmtComponent,
      data:{
      //  title: 'Addjob-List'
     },
    },
    {
        path: 'addnewjobtype',
        component: AddNewJobTypeComponent,
        data:{
        // title: 'AddNewjob'
        },
    },
    {
      path: 'jobtypeDetails/:job_category_id',
      component: EditJobTypeComponent,
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
