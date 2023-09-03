import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { UsersmgmtComponent } from './usersmgmt.component';
import { UserAddComponent } from './add-user.component';
import { ViewUserDetailsComponent } from './usersmgmt-details.component';

const routes: Routes = [  {
  path: '',
  redirectTo: 'list',
  pathMatch: 'full',
},
{
 path: '',
 data: {
  //  title: 'Users'
 },
children: [
 {
   path: '',
   component: UsersmgmtComponent,
   data: {
    // title: 'Users-List'
  },
 },
  {
    path: 'usersList',
    component: UsersmgmtComponent,
    data: {
    //  title: 'Users-List'
   },
  },
  {
   path: 'userDetails/:user_id',
   component: ViewUserDetailsComponent,
   data: {
    //  title: 'User Details',
     action: 'view'
   }
 },
 {
    path: 'add-user',
    component: UserAddComponent,
    data: {
    //  title: 'Add-Users'
   },
  }
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersmgmtRoutingModule { }

