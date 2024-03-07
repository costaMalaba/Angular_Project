import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HttpClientModule } from '@angular/common/http';
import { ApiserviceService } from './apiservice.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRegisterComponent } from './user-register/user-register.component';
import { DetailsComponent } from './profile/details/details.component';
import { EditComponent } from './profile/edit/edit.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { UserInfoComponent } from './dashboard/user-info/user-info.component';
import { HomeMenuComponent } from './dashboard/home-menu/home-menu.component';
import { EnterEmailComponent } from './forgotPassword/enter-email/enter-email.component';
import { ResetPasswordComponent } from './forgotPassword/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UserRegisterComponent,
    DetailsComponent,
    EditComponent,
    ProfileComponent,
    UserInfoComponent,
    HomeMenuComponent,
    EnterEmailComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true
    })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ApiserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
