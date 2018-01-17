import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnlyLoggedInGuard } from './guards/only-logged-in.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: './authorization/authorization.module#AuthorizationModule'
    },
    {
        path: 'dashboard',
        canActivate: [OnlyLoggedInGuard],
        component: DashboardComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'products'
            },
            {
                path: 'products',
                loadChildren: './products/products.module#ProductsModule'
            },
            {
                path: 'profile',
                loadChildren: './profile/profile.module#ProfileModule'
            }
        ]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        OnlyLoggedInGuard
    ]
})
export class AppRoutingModule { }
