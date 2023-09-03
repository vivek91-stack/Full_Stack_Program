import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewBrokerageTypemgmtComponent } from './addbrokeragemgmt.component';
import { AddNewBrokerageTypeComponent } from './addnewbrokeragetype.component'
import { EditBrokerageTypeComponent } from './edit-brokerage.component';

const routes: Routes = [
    {
      path: '',
      component: AddNewBrokerageTypemgmtComponent,
      data:{
      //  title: 'Addbrokerage-List'
     },
    },
    {
        path: 'addnewbrokerage',
        component: AddNewBrokerageTypeComponent,
        data:{
        // title: 'AddNewBrokerage'
        },
    },
    {
      path: 'addnewbroker',
      component: AddNewBrokerageTypeComponent,
      data:{
      // title: 'AddNewBrokerage'
      },
    },
    {
      path: 'brokerageDetails/:type_id',
      component: EditBrokerageTypeComponent,
      data:{
      // title: 'AddNewBrokerage'
      },
    },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddNewBrokerageTypeRoutingModule {}
