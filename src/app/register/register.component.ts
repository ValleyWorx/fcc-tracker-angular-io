import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public LoginForm: FormGroup
  public ErrorMessage: string = null;
  private PasswordsValid: boolean = false;

  constructor(private fb: FormBuilder) {
    this.LoginForm = this.fb.group ({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]]
    });

    this.LoginForm.valueChanges.subscribe(() => {
      this.generateErrorMsg();
    })
  }

  ngOnInit() {
  }

  register(): void {

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
        return false;
      }
    } else {
      return false;
    }
  }
}
