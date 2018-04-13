import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

import { AuthService } from './auth.service';
import { JWTService } from './jwt.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private jwt: JWTService,
    private auth: AuthService,
  ) {}

  /**
   * Determines what features with which a given user can interact
   * @return {boolean}
   */
  canActivate(): boolean {
    if (this.auth.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
