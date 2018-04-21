import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{FormsModule, ReactiveFormsModule}from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { ButtonPrimaryComponent } from './button-primary/button-primary.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { TextInputComponent } from './text-input/text-input.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './services/auth.service';
import{ RegisterComponent}from './register/register.component';
import{LoginComponent}from './login/login.component';

const appRoutes: Routes = [
  {path:'', component: AppComponent},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
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
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
