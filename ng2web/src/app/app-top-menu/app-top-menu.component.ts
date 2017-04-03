import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../globals.service';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './app-top-menu.component.html',
  styleUrls: ['./app-top-menu.component.css']
})
export class AppTopMenuComponent implements OnInit {

  isBusyGettingTransactions: boolean = false;
  tabs: any = [];

  constructor(private globalsService: GlobalsService,
    private generalService: GeneralService) { }

  getTabs() {
    this.isBusyGettingTransactions = true;
    this.generalService.getTopNavigationMenu().subscribe(result => {
      this.isBusyGettingTransactions = false;
      this.tabs = result;
    }, error => {
      this.isBusyGettingTransactions = false;
    });
  }

  ngOnInit() {
    this.generalService.getLoginStatus().subscribe(result => {
      console.log(`App Menu. Login Status changed to ${result}`);
      if (result === "good")
        this.getTabs();
      else
        this.tabs = [];
    });
    this.getTabs();
  }

}
