import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangePasswordComponent } from './changepassword.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
 {
   path: '',
   data: {
    //  title: 'Change-Password'
   },
  children: [
    {
    path: '',
    component: ChangePasswordComponent,
    data: {
      // title: 'Change Password'
    }
    }
 ],
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangePasswordRoutingModule { }
