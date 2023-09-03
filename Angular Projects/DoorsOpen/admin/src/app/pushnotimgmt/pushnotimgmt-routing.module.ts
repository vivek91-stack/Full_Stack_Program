import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PushNotificationComponent } from './pushnotimgmt.component';

const routes: Routes = [
  {
    path: '',
    component: PushNotificationComponent,
    data: {
      // title: 'Notifications'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PushNotificationRoutingModule { }
