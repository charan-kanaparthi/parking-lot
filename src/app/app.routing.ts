import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from 'app/layouts/auth/auth-layout.component';
import { AuthguardGuard } from 'app/authguard.guard';
export const AppRoutes: Routes = [{
  path: '',
  component: AdminLayoutComponent,
  children: [
    {
      path: '',
      loadChildren: './home/home.module#HomeModule',
    },
    {
      path: 'home',
      canActivate:[AuthguardGuard],
      loadChildren: './dashboard/dashboard.module#DashboardModule',
    },
    {
      path: 'users',
      loadChildren: './users/users.module#UsersModule'
    },
     {
        path: 'operations',
        loadChildren: './operations/operations.module#OperationsModule'
      },
    {
      path: '',
      component: AuthLayoutComponent,
      children: [{
        path: 'authentication',
        loadChildren: './authentication/authentication.module#AuthenticationModule'
      }, {
        path: 'error',
        loadChildren: './error/error.module#ErrorModule'
      }]
    },
    {
      path: '**',
      redirectTo: 'error/404'
    }
]

}];


