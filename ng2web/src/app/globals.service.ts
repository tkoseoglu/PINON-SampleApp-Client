import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers } from '@angular/http';

@Injectable()
export class GlobalsService {

  LOCALSTORAGE_CURRENTUSER_NAME = "pinon_current_user";
  LOCALSTORAGE_ACCESSTOKEN_NAME = "pinon_jwt_token";
  client_id = "Pinon";

  appSettings = {
    Version: 1.0
  };

  currentUser = {
    FirstName: "",
    LastName: "",
    Email: "",
    AccessToken: "",
    Roles: ""
  };

  constructor(private router: Router) {
    let savedCurrentUser = localStorage.getItem(this.LOCALSTORAGE_CURRENTUSER_NAME);
    if (savedCurrentUser !== null) {
      this.currentUser = JSON.parse(savedCurrentUser);
    }
  }

  setHeaders() {
    let headers = new Headers();
    headers.append("Authorization", 'bearer ' + localStorage.getItem(this.LOCALSTORAGE_ACCESSTOKEN_NAME));
    return headers;
  }

  handleError(error: any): Promise<any> {
    console.error('Status', error);
    if (error.status === 401 || error.status === 403 || error.status === 404) {
      if (error.statusText === "Missing Jwt Token" || error.statusText === "Not Found") {
        this.router.navigate(['/login']);
      }
      else if (error.statusText === "Unauthorized") {
        this.router.navigate(['/accessDenied']);
      }
    }
    else if (error.status === 0) {
      this.router.navigate(['/error']);
    }
    return Promise.reject(error.message || error);
  }

}
