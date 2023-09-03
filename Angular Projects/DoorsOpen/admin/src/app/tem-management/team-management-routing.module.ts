import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamMemberComponent } from './team-member/team-member.component';
import { TemManagementComponent } from './tem-management.component';

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
            component: TemManagementComponent,
            // data: {
            //     title: 'Vendor-List'
            // },
        },
        {
            path: 'view-team-member/:team_id',
            component: TeamMemberComponent,
            // data: {
            //     title: 'Vendor-List'
            // },
        },
    ]
}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeamManagementRoutingModule { }

