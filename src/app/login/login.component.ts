import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { RestService } from '../services/rest.service';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
        //aliases. Class-level variables.
        private formbuilder: FormBuilder,
        private rest: RestService,
        private auth: AuthService
    ) {
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
    // Authenticate -> then go to main page.
    // api.fcctracker.com/auth
    console.log(this.loginForm.value, 'Login clicked');
    this.rest.post(`${environment.apiURL}/auth`,this.loginForm.value)
    .then( (res) => {
      console.log(res);
    });
    
  }

  ngOnInit() {
  }

}
