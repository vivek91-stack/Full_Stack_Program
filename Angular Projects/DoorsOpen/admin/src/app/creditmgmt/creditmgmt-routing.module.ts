import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditmgmtComponent } from './creditmgmt.component';
import { CreditSettingsComponent } from './credit-settings.component';

const routes: Routes = [
  {
    path: '',
    component: CreditmgmtComponent,
    data:{
      // title: 'Credit-List'
    },
  },
  {
    path: 'credit-setting',
    component: CreditSettingsComponent,
    data:{
      // title: 'Credit-Settings'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditmgmtRoutingModule {}
