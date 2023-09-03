import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

import { UserAuth } from './custom_validation/userAuth';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    data: {
      title: 'Login'
    },
    children: [
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      }
    ]
  },
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [UserAuth],
    // data: {
    //   title: 'Home'
    // },
    children: [
      {
        path: 'dashboard',
        // loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'usersmgmt',
        loadChildren: () => import('./usersmgmt/usersmgmt.module').then(m => m.UsersmgmtModule)
        // path: 'usersmgmt',
        // loadChildren: './usersmgmt/usersmgmt.module#UsersmgmtModule'
      },
      {
        path: 'jobsmgmt',
        loadChildren: () => import('./jobsmgmt/jobsmgmt.module').then(m => m.JobsmgmtModule)
        // loadChildren: './jobsmgmt/jobsmgmt.module#JobsmgmtModule'
      },
      {
        path: 'addjobtypemgmt',
        loadChildren: () => import('./addjobtypemgmt/addjobtypemgmt.module').then(m => m.AddJobTypemgmtModule)
        // loadChildren: './addjobtypemgmt/addjobtypemgmt.module#AddJobTypemgmtModule'
      },
      {
        path: 'addbrokeragemgmt',
        loadChildren: () => import('./addbrokeragemgmt/addbrokeragemgmt.module').then(m => m.AddBrokeragemgmtModule)
        // loadChildren: './addbrokeragemgmt/addbrokeragemgmt.module#AddBrokeragemgmtModule'
      },
      // {
      //   path: 'useradd',
      //   loadChildren: './useradd/useradd.module#UserAddModule'
      // },
      {
        path: 'changepassword',
        loadChildren: () => import('./changepassword/changepassword.module').then(m => m.ChangePasswordModule)

        // loadChildren: './changepassword/changepassword.module#ChangePasswordModule',
      },
      {
        path: 'pushnotimgmt',
        loadChildren: () => import('./pushnotimgmt/pushnotimgmt.module').then(m => m.PushNotificationModule)
        // loadChildren: './pushnotimgmt/pushnotimgmt.module#PushNotificationModule',
      },
      {
        path: 'paymentmgmt',
        loadChildren: () => import('./paymentmgmt/paymentmgmt.module').then(m => m.PaymgmtModule)
        // loadChildren: './paymentmgmt/paymentmgmt.module#PaymgmtModule',
      },
      {
        path: 'creditmgmt',
        loadChildren: () => import('./creditmgmt/creditmgmt.module').then(m => m.CreditmgmtModule)
        // loadChildren: './creditmgmt/creditmgmt.module#CreditmgmtModule',
      },
      {
        path: 'creditplan',
        loadChildren: () => import('./creditplan/creditplan.module').then(m => m.CreditPlanModule)
        // loadChildren: './creditplan/creditplan.module#CreditPlanModule',
      },
      {
        path: 'impression',
        loadChildren: () => import('./impressionmgmt/impressionmgmt.module').then(m => m.ImpressionmgmtModule)
        // loadChildren: './impressionmgmt/impressionmgmt.module#ImpressionmgmtModule',
      },
      {
        path: 'vendormgmt',
        loadChildren: () => import('./vendor-management/vendor-management.module').then(m => m.VendorManagementModule)
      },
      {
        path: 'teammgmt',
        loadChildren: () => import('./tem-management/team-management.module').then(m => m.TeamManagementModule)
      },
      {
        path: 'jobsuggestionmgmt',
        loadChildren: () => import('./jobsuggestionmgmt/jobsuggestionmgmt.module').then(m => m.AddJobTypemgmtModule)
      },
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
