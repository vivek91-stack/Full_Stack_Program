import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpressionmgmtComponent } from './impressionmgmt.component';
import { UpdateImpressionComponent } from './update-impression.component';
import { AddImpressionComponent } from './add-impression.component';
import { ImpressionmgmtDetailsComponent } from './impressoinmgmt-details.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'list',
  pathMatch: 'full',
},
{
  path: '',
  data: {},
  children: [
    {
      path: '',
      component: ImpressionmgmtComponent,
    },
    {
      path: 'add-impression',
      component: AddImpressionComponent,
      data: {},
    },
    {
      path: 'edit-impression/:bannerid',
      component: UpdateImpressionComponent,
      data: {},
    },
    {
      path: 'view-userlist/:id',
      component: ImpressionmgmtDetailsComponent,
      data: {},
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpressionmgmtRoutingModule { }

