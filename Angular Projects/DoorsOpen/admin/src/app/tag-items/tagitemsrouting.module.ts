import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { ItemTagsComponent } from './tagitems.component';

const routes: Routes = [ 
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
    },
    {
        path: '',
        data: {
            title: 'Tag Management'
        },
        children: [
            {
            path: '',
            component: ItemTagsComponent,
            data: {
                title: 'users-List'
            },
    }
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemtagRoutingModule { }

