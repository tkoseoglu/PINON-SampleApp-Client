import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../hospital.service';
import { Observable } from 'rxjs/Rx';
import { HospitalRecord } from '../models/hospitalRecord';
import { HospitalFilter } from '../models/filter.hospital';
import { HospitalSearch } from '../models/search.hospital';
import { AppMessagingModule } from '../app-messaging/app-messaging.module';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit {

  isFirstSearch: boolean = true;
  isBusy: boolean = false;
  rawHospitals: Observable<any>;
  hospitals: Array<HospitalRecord> = new Array<HospitalRecord>();
  filteredHospitals: Array<HospitalRecord> = new Array<HospitalRecord>();
  totalNumberOfRecords: number = 0;

  //for client-side filtering
  filter: HospitalFilter = new HospitalFilter();

  //for server-side searching and paging
  hospitalSearch: HospitalSearch = new HospitalSearch();

  predicate: boolean = true;
  sortColumn: string = "hospitalName";

  constructor(private hospitalService: HospitalService,
    private appMessenger: AppMessagingModule) { }

  getHospitals() {
    this.isBusy = true;
    this.hospitalService.searchHospitals(this.hospitalSearch).subscribe(result => {
      this.isBusy = false;
      this.isFirstSearch = false;
      this.rawHospitals = Observable.from(result.hospitals);
      this.totalNumberOfRecords = result.totalNumberOfRecords;
      this.hospitals = new Array<HospitalRecord>();
      const sub = this.rawHospitals.subscribe(rawHospital => {
        this.hospitals.push(new HospitalRecord(rawHospital.id, rawHospital.hospitalName, rawHospital.numberOfPatients));
      });

      this.applyFilter();
    });
  }

  filterByHospitalName(newHospitalNameFilter) {
    this.filter.hospitalName = newHospitalNameFilter;
    this.applyFilter();
  }

  applyFilter() {
    this.filteredHospitals = this.hospitals;
    if (this.filter.hospitalName) {
      this.filteredHospitals = this.filteredHospitals.filter(item => item.hospitalName.toLowerCase().indexOf(this.filter.hospitalName.toLowerCase()) >= 0);
    }
  }


  newPageSize(pageSize: number) {
    this.hospitalSearch.pageSize = pageSize;
    this.hospitalSearch.page = 0;
    this.getHospitals();
  }

  newPage(page: number) {
    this.hospitalSearch.page = page;
    this.getHospitals();
  }

  deleteHospital(hospital: HospitalRecord) {
    if (confirm(`Ok to delete hospital ${hospital.hospitalName}?`)) {
      this.isBusy = true;
      this.hospitalService.adminDelete(hospital.id).subscribe(result => {
        this.isBusy = false;
        this.appMessenger.displaySuccess("Success!", "Hospital removed successfully");
        this.getHospitals();
      }, error => {
        this.isBusy = false;
        this.appMessenger.displayError("Error!", "");
      });
    }
  }

  ngOnInit() {
    this.getHospitals();
  }

}
