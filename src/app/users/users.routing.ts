import { Routes } from '@angular/router';

import { UsersComponent } from './users.component';
// import { ProfileComponent } from 'app/users/profile/profile.component';

export const UsersRoutes: Routes = [{
  path: '',
  component: UsersComponent,
  data: {
    heading: 'Users'
  },
}];
