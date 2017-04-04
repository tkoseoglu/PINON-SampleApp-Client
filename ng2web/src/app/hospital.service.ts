import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestOptionsArgs, RequestMethod, ResponseContentType, URLSearchParams } from '@angular/http';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GlobalsService } from './globals.service';
import { Patient } from './models/patient';
import { HospitalRecord } from './models/hospitalRecord';
import { HospitalSearch } from './models/search.hospital';

@Injectable()
export class HospitalService {

  constructor(private http: Http, private router: Router, private globals: GlobalsService) { }

  getHospitals() {
    var url = `${environment.appServerUrl}/api/hospital/getall`;
    return this.http.get(url).catch((err) => {
      return this.globals.handleError(err)
    }).map(res => res.json());
  }

  getHospitalDetails(id) {
    var url = `${environment.appServerUrl}/api/hospital/gethospitaldetails/${id}`;
    console.log(url);
    return this.http.get(url, {
      headers: this.globals.setHeaders()
    }).catch((err) => {
      return this.globals.handleError(err)
    }).map(res => res.json());
  }

  save(hospital: HospitalRecord) {
    var url = `${environment.appServerUrl}/api/hospital/SaveHospital`;
    return this.http.post(url, hospital, {
      headers: this.globals.setHeaders()
    }).catch((err) => {
      return this.globals.handleError(err)
    }).map(res => res.json());
  }

  adminDelete(id: number) {
    var url = `${environment.appServerUrl}/api/hospital/DeleteHospital/${id}`;
    console.log(url);
    return this.http.get(url, {
      headers: this.globals.setHeaders()
    }).catch((err) => {
      return this.globals.handleError(err)
    }).map(res => res.json());
  }

  searchHospitals(query: HospitalSearch) {
    var url = `${environment.appServerUrl}/api/hospital/search`;
    console.log(query);
    return this.http.post(url, query, {
      headers: this.globals.setHeaders()
    }).catch((err) => {
      return this.globals.handleError(err)
    }).map(res => res.json());
  }

}
