import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { JobsmgmtComponent } from './jobsmgmt.component';
// import { JobAddComponent } from './add-job.component';
import { ViewJobsDetailsComponent } from './job-details.component';
import { JobTranjactionComponent } from './job-tranjections.component';

const routes: Routes = [  {
  path: '',
  redirectTo: 'list',
  pathMatch: 'full',
},
{
 path: '',
 data: {
  //  title: 'Jobs'
 },
children: [
 {
   path: '',
   component: JobsmgmtComponent,
   data: {
    // title: 'Jobs-List'
  },
 },
  {
    path: 'JobsList',
    component: JobsmgmtComponent,
    data: {
    //  title: 'Jobs-List'
   },
  },
  {
   path: 'jobDetails/:job_id',
   component: ViewJobsDetailsComponent,
   data: {
    //  title: 'Job Details',
     action: 'view'
   }
 },
 {
  path: 'jobTranjactions/:job_id',
  component: JobTranjactionComponent,
  data: {
   //  title: 'Job Details',
    action: 'view'
  }
},
//  {
//     path: 'add-user',
//     component: JobAddComponent,
//     data: {
//      title: 'Add-Jobs'
//    },
//   }
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsmgmtRoutingModule { }

