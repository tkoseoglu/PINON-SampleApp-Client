import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Patient } from '../models/patient';
import { UserAccount } from '../models/userAccount';
import { HospitalService } from '../hospital.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor(private patientService: PatientService,
    private formBuilder: FormBuilder,
    private hospitalService: HospitalService,
    private router: Router) { }

  hospitals = [];

  patient: Patient;
  userAccount: UserAccount;

  patientForm: FormGroup;
  isBusy: boolean = false;

  getHospitals() {
    this.hospitalService.getHospitals().subscribe(result => {
      this.hospitals = result;
    });
  }

  savePatient(patient: Patient) {
    this.isBusy = true;
    this.patientService.save(patient).subscribe(result => {
      this.isBusy = false;
      this.getDetails();
    }, error => {
      this.isBusy = false;
    });
  }

  deletePatient() {
    if (confirm("Ok to delete?")) {
      this.isBusy = true;
      this.patientService.delete(this.patient).subscribe(result => {
        this.isBusy = false;
        this.router.navigate(['/logoff']);
      }, error => {
        this.isBusy = false;
      });
    }
  }

  getDetails() {
    this.patientService.getDetails().subscribe(result => {
      this.patient = result.patient;
      this.userAccount = result.userAccount;

      this.patientForm.setValue({
        id: result.patient.id,
        eyeColor: result.patient.eyeColor,
        hairColor: result.patient.hairColor,
        height: result.patient.height,
        weight: result.patient.weight,
        hospitalId: result.patient.hospital.id,
        userAccountId: result.patient.userAccountId
      });
    });
  }

  ngOnInit() {
    this.getDetails();
    this.getHospitals();

    this.patientForm = this.formBuilder.group({
      id: '',
      eyeColor: '',
      hairColor: '',
      height: '',
      weight: '',
      hospitalId: '',
      userAccountId: ''
    });
  }

}
