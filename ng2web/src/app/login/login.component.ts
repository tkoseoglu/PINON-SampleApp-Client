import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GeneralService } from '../general.service';
import { GlobalsService } from '../globals.service';
import { Login } from '../models/interface.login';
import { Router } from '@angular/router';
import { AppMessagingModule } from '../app-messaging/app-messaging.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isBusy: boolean = false;
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private globalsService: GlobalsService,
    private generalService: GeneralService,
    private appMessenger: AppMessagingModule,
    private router: Router) { }

  login(model: Login) {
    this.isBusy = true;
    this.generalService.login(model).subscribe(result => {
      this.isBusy = false;
      if (result.access_token === undefined || result.HasError) {
        this.generalService.setLoginStatus("bad");
        this.appMessenger.displayError("Sign-In failed!", `${result.Message}`);
      }
      else {
        localStorage.setItem(this.globalsService.LOCALSTORAGE_ACCESSTOKEN_NAME, result.access_token);
        this.globalsService.currentUser = result.current_user;
        this.globalsService.currentUser.AccessToken = result.access_token;
        localStorage.setItem(this.globalsService.LOCALSTORAGE_CURRENTUSER_NAME, JSON.stringify(this.globalsService.currentUser));
        //notify top menu to refresh
        this.generalService.setLoginStatus("good");
        this.appMessenger.displaySuccess("Success!", "You are now logged on");
        if (result.current_user.Roles.indexOf("Admin") >= 0)
          this.router.navigate(['/patients']);
        else
          this.router.navigate(['/patient']);
      }
    }, error => {
      this.isBusy = false;
      this.appMessenger.displayError("Sign-In failed", `${error}`);
      this.generalService.setLoginStatus("bad");
    });
  }

  ngOnInit() {
    // var defaultEmail = "jharsh@pinon.com";
    // var defaultPwd = "123456";
    var defaultEmail = "";
    var defaultPwd = "";
    this.loginForm = this.formBuilder.group({
      email: [defaultEmail, Validators.required],
      password: [defaultPwd, Validators.required]
    });
  }

}
