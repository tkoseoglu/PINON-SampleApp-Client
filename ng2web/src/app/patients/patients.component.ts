import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Observable } from 'rxjs/Rx';
import { Patient } from '../models/patient';
import { PatientFilter } from '../models/filter.patient';
import { PatientSearch } from '../models/search.patient';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  isFirstSearch: boolean = true;
  isBusy: boolean = false;
  rawPatients: Observable<any>;
  patients: Array<Patient> = new Array<Patient>();
  filteredPatients: Array<Patient> = new Array<Patient>();
  totalNumberOfRecords: number = 0;

  //for client-side filtering
  filter: PatientFilter = new PatientFilter();

  //for server-side searching and paging
  patientSearch: PatientSearch = new PatientSearch();

  predicate: boolean = true;
  sortColumn: string = "firstName";

  constructor(private patientService: PatientService) { }

  getPatients() {
    this.isBusy = true;
    this.patientService.searchPatients(this.patientSearch).subscribe(result => {
      this.isBusy = false;
      this.isFirstSearch = false;
      this.rawPatients = Observable.from(result.patients);
      this.totalNumberOfRecords = result.totalNumberOfRecords;
      this.patients = new Array<Patient>();
      const sub = this.rawPatients.subscribe(rawPatient => {
        this.patients.push(new Patient(rawPatient.id,
          rawPatient.hospital,
          rawPatient.firstName,
          rawPatient.lastName,
          rawPatient.hairColor,
          rawPatient.eyeColor,
          rawPatient.height,
          rawPatient.weight,
          rawPatient.userAccountId));
      });

      this.applyFilter();
    });
  }

  applyFilter() {
    this.filteredPatients = this.patients;
    if (this.filter.name) {
      this.filteredPatients = this.filteredPatients.filter(item => item.firstName.toLowerCase().indexOf(this.filter.name.toLowerCase()) >= 0 || item.lastName.toLowerCase().indexOf(this.filter.name.toLowerCase()) >= 0);
    }
    if (this.filter.hospitalName) {
      this.filteredPatients = this.filteredPatients.filter(item => item.hospital.hospitalName.toLowerCase().indexOf(this.filter.hospitalName.toLowerCase()) >= 0);
    }
  }

  filterByPatientName(newPatientNameFilter) {
    this.filter.name = newPatientNameFilter;
    this.applyFilter();
  }

  newPageSize(pageSize: number) {
    this.patientSearch.pageSize = pageSize;
    this.patientSearch.page = 0;
    this.getPatients();
  }

  newPage(page: number) {
    this.patientSearch.page = page;
    this.getPatients();
  }

  ngOnInit() {
    this.getPatients();
  }

}
