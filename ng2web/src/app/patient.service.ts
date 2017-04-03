import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestOptionsArgs, RequestMethod, ResponseContentType, URLSearchParams } from '@angular/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GlobalsService } from './globals.service';
import { Patient } from './models/patient';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PatientService {

  constructor(private http: Http, private router: Router, private globals: GlobalsService) { }

  getDetails() {
    var url = `${environment.appServerUrl}/api/patient/GetPatientDetails`;
    return this.http.get(url, {
      headers: this.globals.setHeaders()
    }).catch((err) => {
      return this.globals.handleError(err)
    }).map(res => res.json());
  }

  save(patient: Patient) {
    var url = `${environment.appServerUrl}/api/patient/SavePatient`;
    return this.http.post(url, patient, {
      headers: this.globals.setHeaders()
    }).catch((err) => {
      return this.globals.handleError(err)
    }).map(res => res.json());
  }

  delete(patient: Patient) {
    var url = `${environment.appServerUrl}/api/patient/DeletePatient`;
    return this.http.post(url, patient, {
      headers: this.globals.setHeaders()
    }).catch((err) => {
      return this.globals.handleError(err)
    }).map(res => res.json());
  }

}
