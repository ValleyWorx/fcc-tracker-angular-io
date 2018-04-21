import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private formbuilder: FormBuilder) {
    this.loginForm = this.formbuilder.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    })
    this.loginForm.valueChanges.subscribe(() => {
      // es6 syntax for functions. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
      console.log(this.loginForm.value );
    })
  }

  login(): void {

    console.log(this.loginForm.value, "Login clicked");
  }

  ngOnInit() {
  }

}
