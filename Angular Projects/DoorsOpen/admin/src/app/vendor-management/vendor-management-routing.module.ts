import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { VendorDetailsComponent } from './vendor-details/vendor-details.component';
import { VendorManagementComponent } from './vendor-management.component';

const routes: Routes = [{
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
},
{
    path: '',
    data: {
    },
    children: [
        {
            path: '',
            component: VendorManagementComponent,
            // data: {
            //     title: 'Vendor-List'
            // },
        },
        {
            path: 'add-vendor',
            component: AddVendorComponent,
            // data: {
            //     title: 'Vendor-List'
            // },
        },
        {
            path: 'vendor-details/:vendor_id',
            component: VendorDetailsComponent
          }
    ]
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VendorManagementRoutingModule { }

