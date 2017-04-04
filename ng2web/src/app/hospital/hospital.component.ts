import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HospitalService } from '../hospital.service';
import { HospitalRecord } from '../models/hospitalRecord';
import { AppMessagingModule } from '../app-messaging/app-messaging.module';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {

  title: string = "Add Hospital";
  isEditMode: boolean = false;
  hospitalForm: FormGroup;
  isBusy: boolean = false;
  responseMessage: string = "";
  hospital: HospitalRecord;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private appMessenger: AppMessagingModule,
    private hospitalService: HospitalService) { }


  getDetails(id) {
    this.hospitalService.getHospitalDetails(id).subscribe(result => {
      this.hospital = result;

      this.hospitalForm.setValue({
        id: result.id,
        hospitalName: result.hospitalName
      });
    });
  }

  save(model: HospitalRecord) {
    this.isBusy = true;
    this.responseMessage = "";
    this.hospitalService.save(model).subscribe(result => {
      this.isBusy = false;
      if (result.HasError) {
        this.responseMessage = result.Message;
        this.appMessenger.displayError("Error!", result.Message);
      }
      else {
        this.appMessenger.displaySuccess("Success!", "Changes saved successfully");
        this.router.navigate(['/hospitals']);
      }
    }, error => {
      this.isBusy = false;
    });
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        let id = +params['id'];
        this.title = "Edit Hospital";
        this.isEditMode = true;
        this.getDetails(id);
      }
    });

    this.hospitalForm = this.formBuilder.group({
      id: '',
      hospitalName: ['', Validators.required]
    });
  }

}
