import { Component, OnInit } from '@angular/core';
import { GlobalsService } from '../globals.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private globalsService: GlobalsService) { }

  ngOnInit() {
    
  }

}
