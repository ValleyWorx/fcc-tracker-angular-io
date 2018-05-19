import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { RestService } from '../services/rest.service';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public isLoading: boolean;
  public errorMessage: string = "No data entered";
  public isLoginButtonDisabled: boolean = true;
  constructor(
        //aliases. Class-level variables.
        private formbuilder: FormBuilder,
        private rest: RestService,
        private auth: AuthService,
        private router: Router
  ) {
    this.loginForm = this.formbuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    })
    this.loginForm.valueChanges.subscribe(() => {
      // es6 syntax for functions. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
      this.checkForErrors();
      this.disableLoginButton();
    })
    this.isLoading = false;

  }

  login(): void {
    // Authenticate -> then go to main page.
    // api.fcctracker.com/auth
    this.isLoading = true;
    setTimeout(() => {this.isLoading = false;}, 2000);
    console.log(this.loginForm.value, 'Login clicked');
    this.rest.post(`${environment.apiURL}/auth`,this.loginForm.value)
    .then( (resp) => {
      this.auth.setUser({
        fname: resp.fname,
        id: resp.id,
        lname: resp.lname,
        role: resp.role
      });
      this.auth.setToken(resp.jwt);
      this.auth.setRefresh(resp.refreshToken);
      this.auth.setExpires(resp.expires);
      this.router.navigate(['/profile']);
    }).catch((err) => {
      console.log(err);
      this.errorMessage = "User email and/or password is not valid.";
    });
  }

  checkForErrors() : void {
    const form = this.loginForm.controls;
    let errorFound: boolean = false;

    if (!form.email.valid){
      this.errorMessage = "This is not a valid email address";
      errorFound = true;
    } else if (!form.password.valid) {
      this.errorMessage = "Your password is too short";
      errorFound = true;
    } else {
      errorFound = false;
    }

    if (!errorFound){
      this.errorMessage = null;
    }
  }

  //return true if the button is to be disabled
  disableLoginButton(): void{
    this.isLoginButtonDisabled = (!this.loginForm.valid || this.errorMessage) ? true: false;
    console.log("disabled: " + this.isLoginButtonDisabled);
  }

  loadingMessage() : string{
      if (this.isLoading === true){
        return "thinking...";
      }
      else{
        return "";
      }
  }

  ngOnInit() {
  }

}
