import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GeneralService } from '../general.service';
import { GlobalsService } from '../globals.service';
import { Register } from '../models/interface.register';
import { Router } from '@angular/router';
import { HospitalService } from '../hospital.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isBusy: boolean = false;
  registrationForm: FormGroup;
  hospitals = [];
  responseSuccessMessage: string = "";
  responseErrorMessage: string = "";

  constructor(private formBuilder: FormBuilder,
    private globalsService: GlobalsService,
    private generalService: GeneralService,
    private hospitalService: HospitalService,
    private router: Router) {
    this.validatePasswordConfirmation = this.validatePasswordConfirmation.bind(this);
  }

  private validatePasswordConfirmation(passwordConfirmation: FormControl) {
    if (this.registrationForm !== undefined) {
      let passwordCtrl = this.registrationForm.controls["password"];
      if (passwordCtrl === undefined || passwordConfirmation === undefined) return null;
      if (passwordCtrl.value === "" || passwordConfirmation.value === "") return null;
      if (passwordCtrl.value === null || passwordConfirmation.value === null) return null;
      if (passwordCtrl.value === passwordConfirmation.value) return null;
      return {
        noMatch: true
      }
    }
    return null;
  }

  getHospitals() {
    this.hospitalService.getHospitals().subscribe(result => {
      this.hospitals = result;
    });
  }

  register(model: Register) {
    this.isBusy = true;
    this.responseSuccessMessage = "";

    model.hospitalId = this.globalsService.hospitalId;

    this.generalService.register(model).subscribe(result => {
      this.isBusy = false;
      if (result.HasError) {
        this.responseErrorMessage = result.Message;
      }
      else {
        this.responseSuccessMessage = "Success! You've registered successfully."
      }
    }, error => {
      this.isBusy = false;
    });
  }

  ngOnInit() {

    this.getHospitals();

    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      passwordConfirmation: ['', Validators.compose([Validators.required, this.validatePasswordConfirmation])]
    });


  }

}
