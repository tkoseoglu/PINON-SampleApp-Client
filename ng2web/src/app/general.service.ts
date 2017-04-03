import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestOptionsArgs, RequestMethod, ResponseContentType, URLSearchParams } from '@angular/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GlobalsService } from './globals.service';
import { Login } from './models/interface.login';
import { Register } from './models/interface.register';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GeneralService {

  private logStatus: string;
  private subject: Subject<string> = new Subject<string>();

  constructor(private http: Http, private router: Router, private globals: GlobalsService) { }

  setLoginStatus(status: string): void {
    this.logStatus = status;
    this.subject.next(status);
  }

  getLoginStatus(): Observable<string> {
    return this.subject.asObservable();
  }

  getTopNavigationMenu() {
    var url = `${environment.appServerUrl}/api/util/getmenu`;
    return this.http.get(url, {
      headers: this.globals.setHeaders()
    }).catch((err) => {
      return this.globals.handleError(err)
    }).map(res => res.json());
  }

  getHospitals() {
    var url = `${environment.appServerUrl}/api/hospital/getall`;
    return this.http.get(url).catch((err) => {
      return this.globals.handleError(err)
    }).map(res => res.json());
  }

  login(login: Login) {
    var url = `${environment.appServerUrl}/useraccount/signin`;
    return this.http
      .post(url, login)
      .catch((err) => {
        return this.globals.handleError(err)
      })
      .map(res => res.json());
  }

  register(register: Register) {
    var url = `${environment.appServerUrl}/useraccount/register`;
    return this.http
      .post(url, register)
      .catch((err) => {
        return this.globals.handleError(err)
      })
      .map(res => res.json());
  }

  logoff() {
    var url = `${environment.appServerUrl}/useraccount/signout`;
    console.log(url);
    return this.http
      .post(url, "")
      .catch((err) => {
        return this.globals.handleError(err)
      })
      .map(res => res.text());
  }

}
