import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Injectable, ViewContainerRef } from '@angular/core';
import {
  Http,
  Headers,
  RequestOptionsArgs,
  RequestOptions
} from '@angular/http';

import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { ButtonPrimaryComponent } from './button-primary/button-primary.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { TextInputComponent } from './text-input/text-input.component';
import { NavbarComponent } from './navbar/navbar.component';

import { RestService } from './services/rest.service';
import { AuthService } from './services/auth.service';
import { JWTService } from './services/jwt.service';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'not-found', component: NotFoundComponent }

];

@NgModule({
  declarations: [
    AppComponent,
    ButtonPrimaryComponent,
    PageFooterComponent,
    TextInputComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [AuthService, RestService, JWTService],
  bootstrap: [AppComponent]
})
export class AppModule {}
