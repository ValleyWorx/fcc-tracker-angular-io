import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { RestService } from '../services/rest.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public LoginForm: FormGroup
  public ErrorMessage: string = null;
  public PasswordsValid: boolean = false;
  public isLoading: boolean;


  constructor(
    private auth: AuthService,
    public fb: FormBuilder,
    private rest: RestService
) {
    this.LoginForm = this.fb.group ({
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]],
      fccCode: ['', [Validators.required]]
    });

    this.LoginForm.valueChanges.subscribe(() => {
      this.generateErrorMsg();
    })

    this.LoginForm.valueChanges.subscribe(() => {
      this.generateLoadingMsg();
    })
  }

  ngOnInit() {
  }
//make sure you remove the 'console.log(this.LoginForm.value);' when done testing


  register(): void { console.log(this.LoginForm.value);
    if (this.formIsValid()){
      this.isLoading = true;

      this.rest.post(`${environment.apiURL}/user/register`,this.LoginForm.value)
      .then( (res) => {
        console.log(res);

        this.rest.post(`${environment.apiURL}/auth`,this.LoginForm.value)
        .then( (resp) => {

          this.auth.setUser({
            fname: resp.fname,
            id: resp.id,
            lname: resp.lname,
            role: resp.role
          })

          this.auth.setToken(resp.jwt);
          this.auth.setRefresh(resp.refreshToken);
          this.auth.setExpires(resp.expires)
        console.log(resp);
        })
      });
    }





  }
  generateLoadingMsg(): void {
    const form = this.LoginForm.controls
    let errorFound: boolean = false;
  }
  generateErrorMsg(): void {
    const form = this.LoginForm.controls
    let errorFound: boolean = false;

    if (!form.email.valid) {
        this.ErrorMessage = "This is not a valid email address"
        errorFound = true;
    } else if (form.password.value !== form.repassword.value) {
        this.ErrorMessage = "Your password values do not match"
        errorFound = true;
    } else if (form.password.value.length < 5 && form.repassword.value.length > 0) {
        this.ErrorMessage = "Your password is too short"
        errorFound = true;
    } else {
      errorFound = false;
    }

    if (!errorFound) {
      this.ErrorMessage = null;
    }


  }

  formIsValid(): boolean {
    if (!this.LoginForm.valid) {
      return false;
    } else {
      if (this.LoginForm.value.password !== this.LoginForm.value.repassword) {
        return false;
      } else {
        if (this.LoginForm.value.password.length >= 5 && this.LoginForm.value.repassword.length >= 5) {
          return true
        } else {
          return false;
        }
      }
    }
  }
}
