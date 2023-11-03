import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsComponent } from './profile/details/details.component';
import { UserInfoComponent } from './dashboard/user-info/user-info.component';
import { EnterEmailComponent } from './forgotPassword/enter-email/enter-email.component';
import { ResetPasswordComponent } from './forgotPassword/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'resetpassword',
    component: EnterEmailComponent
  },
  {
    path: 'changepassword/:id',
    component: ResetPasswordComponent
  },
  {
    path: 'home',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: UserInfoComponent
      },
      {
        path: 'details',
        component: DetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
