import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { ButtonPrimaryComponent } from './button-primary/button-primary.component';
import { PageFooterComponent } from './page-footer/page-footer.component';
import { TextInputComponent } from './text-input/text-input.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './services/auth.service';

const appRoutes: Routes = [
  {path:'', component: AppComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ButtonPrimaryComponent,
    PageFooterComponent,
    TextInputComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    MDBBootstrapModule.forRoot(),
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
