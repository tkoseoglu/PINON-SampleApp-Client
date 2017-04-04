import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../general.service';
import { GlobalsService } from '../globals.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.component.html',
  styleUrls: ['./logoff.component.css']
})
export class LogoffComponent implements OnInit {

  constructor(private generalService: GeneralService,
    private globalsService: GlobalsService,
    private router: Router) { }



  logoff() {
    localStorage.setItem(this.globalsService.LOCALSTORAGE_ACCESSTOKEN_NAME, "");
    this.globalsService.currentUser = {
      FirstName: "",
      LastName: "",
      Email: "",
      AccessToken: "",
      Roles: ""
    };
    localStorage.setItem(this.globalsService.LOCALSTORAGE_CURRENTUSER_NAME, JSON.stringify(this.globalsService.currentUser));
    this.generalService.setLoginStatus("bad");
    this.generalService.logoff().subscribe(result => {
      this.router.navigate(['/home']);
    }, error => { });
  }

  ngOnInit() {
    this.logoff();
  }

}
