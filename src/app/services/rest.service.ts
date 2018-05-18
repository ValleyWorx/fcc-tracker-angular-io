import { Injectable } from '@angular/core';
import {
  Http,
  Headers,
  RequestOptionsArgs,
  RequestOptions
} from '@angular/http';
import { Router } from '@angular/router';

import { JWTService } from './jwt.service';

import { environment } from '../../environments/environment';

@Injectable()
export class RestService {
  private _error: boolean = false;
  private _errorMsg: string = '';

  constructor(
    private http: Http,
    private router: Router,
    private jwt: JWTService
  ) {}

  /**
   * Getter for error
   * @return {boolean} [readonly]
   */
  get error(): boolean {
    return this._error;
  }

  /**
   * Getter for error msg
   * @return {string} [readonly]
   */
  get errorMsg(): string {
    return this._errorMsg;
  }

  /**
   * Generates a console log
   * @param {string} type [get, post, put, delete]
   * @param {string} url  [api url]
   * @param {any}    data
   */
  generateLogs(type: string, url: string, data?: any): void {
    console.log(
      `%c ${type.toUpperCase()} API CALL TO`,
      'background-color: #333; color: #98bccd;'
    );

    console.log(url);

    console.log(`%c DATA RETURNED`, 'background-color: #333; color: #f5f5f5;');

    console.table(data);
  }

  /**
   * Abstracts HTTP POST
   * @param  {string}       url
   * @param  {any}          body
   * @return {Promise<any>}
   */
  post(url: string, body?: any): Promise<any> {
    let promise: Promise<any>;

    promise = this.http
      .post(url, body, this.buildOptions())
      .map(res => res.json())
      .toPromise()
      .catch(err => this.handleError(err));

    if (!environment.production) {
      promise.then(res => {
        const log = {
          url: url,
          data: res
        };

        this.generateLogs('put', log.url, log.data);
      });
    }

    return promise;
  }

  /**
   * Abstracts HTTP GET
   * @param  {string}       url
   * @return {Promise<any>}
   */
  get(url: string): Promise<any> {
    let promise: Promise<any>;

    promise = this.http
      .get(url, this.buildOptions())
      .map(res => res.json())
      .toPromise()
      .catch(err => this.handleError(err));

    if (!environment.production) {
      promise.then(res => {
        const log = {
          url: url,
          data: res
        };

        this.generateLogs('get', log.url, log.data);
      });
    }

    return promise;
  }

  /**
   * Abstracts HTTP DELETE
   * @param  {string}       url
   * @return {Promise<any>}
   */
  delete(url: string): Promise<any> {
    let promise: Promise<any>;

    promise = this.http
      .delete(url, this.buildOptions())
      .map(res => res.json())
      .toPromise()
      .catch(err => this.handleError(err));

    if (!environment.production) {
      promise.then(res => {
        const log = {
          url: url,
          data: res
        };

        this.generateLogs('delete', log.url, log.data);
      });
    }

    return promise;
  }

  /**
   * Abstracts HTTP PUT
   * @param  {string}       url
   * @param  {any}          body
   * @return {Promise<any>}
   */
  put(url: string, body?: any): Promise<any> {
    let promise: Promise<any>;

    promise = this.http
      .put(url, body, this.buildOptions())
      .map(res => res.json())
      .toPromise()
      .catch(err => this.handleError(err));

    if (!environment.production) {
      promise.then(res => {
        const log = {
          url: url,
          data: res
        };

        this.generateLogs('put', log.url, log.data);
      });
    }

    return promise;
  }

  /**
   * Lets use set build options with auth token header on abstracted HTTP calls
   * @return {RequestOptionsArgs}
   */
  buildOptions(): RequestOptionsArgs {
    this._error = false;
    this._errorMsg = '';

    const options = new RequestOptions();
    options.headers = new Headers();
    options.headers.append('Accept', 'application/json');
    options.headers.append('Authorization', 'Bearer ' + this.jwt.checkToken());
    return options;
  }

  /**
   * Error handling for all abstracted calls, doesn't reject a Promise
   * @param  {any}          serverError
   */
  handleError(serverError: any): void {
    this._error = true;
    try {
      this._errorMsg = JSON.parse(serverError._body).message;

    } catch(e){
      this._errorMsg = (serverError._body);
    }

    
    console.log('Caught', this.errorMsg);
    this.router.navigate(['/login']);
  }
}
