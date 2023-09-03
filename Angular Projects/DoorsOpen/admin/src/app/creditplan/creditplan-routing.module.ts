import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditPlanComponent } from './creditplan.component';
import { addCreditPlanComponent } from './add-creditplan.component';
import { creditPlanViewComponent } from './creditplan-view.component';

const routes: Routes = [
    {
      path: '',
      component: CreditPlanComponent,
      data:{
      //  title: 'Payment-List'
     },
   },
   {
     path: 'add-creditplan',
     component: addCreditPlanComponent
   },
   {
     path: 'view-creditplan/:credit_id',
     component: creditPlanViewComponent
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditPlanRoutingModule {}
