import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymgmtComponent } from './paymentmgmt.component';

const routes: Routes = [
    {
      path: '',
      component: PaymgmtComponent,
      data:{
      //  title: 'Payment-List'
     },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymgmtRoutingModule {}
