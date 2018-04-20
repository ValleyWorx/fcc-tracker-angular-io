import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  public token: string = '';
  public refresh: string = '';
  public expires: number = -1;
  public user: any = null;

  constructor(public router: Router) {}

  loggedIn(): boolean {
    if (this.getToken() !== '') {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Sets JWT token in token behavior subjecet
   * @param {string} token
   */
  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }

  /**
   * Returns JWT token string from token behavior subject
   * @returns {string}
   */
  getToken(): string {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== '') {
      const expires = Number(localStorage.getItem('expires'));
      const seconds = Math.floor(new Date().getTime() / 1000);

      if (seconds >= expires) {
        // this.router.navigate(['/']);
        this.setToken(this.getRefresh());
      } else {
        this.setToken(localStorage.getItem('token'));
      }
    } else {
      return '';
    }

    return this.token;
  }

  setRefresh(refresh: string): void {
    localStorage.setItem('refresh', refresh);
    this.refresh = refresh;
  }

  getRefresh(): string {
    if (
      localStorage.getItem('refresh') &&
      localStorage.getItem('refresh') !== ''
    ) {
      this.setRefresh(localStorage.getItem('refresh'));
    }

    return this.refresh;
  }

  setExpires(expires: number): void {
    localStorage.setItem('expires', String(expires));
    this.expires = expires;
  }

  getExpires(): number {
    if (
      localStorage.getItem('expires') &&
      localStorage.getItem('expires') !== ''
    ) {
      this.setExpires(Number(localStorage.getItem('expires')));
    }

    return this.expires;
  }

  /**
   * Sets the signed in user
   */
  setUser(user: object): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  /**
   * Returns the signed in user
   */
  getUser(): any {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }

    return this.user;
  }

  logout() {
    this.setToken(null);
    this.setRefresh(null);
    this.setExpires(null);
    this.setUser(null);

    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    localStorage.removeItem('expires');
    localStorage.removeItem('user');

    this.router.navigate(['']);
  }
}
