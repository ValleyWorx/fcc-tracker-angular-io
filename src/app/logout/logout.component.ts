import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})

export class LogoutComponent implements OnInit {

  constructor(
    private rest: RestService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout(): void {
    this.auth.logout();
    this.home();
  }

  home(): void {
    this.router.navigate(['']);
  }

}
