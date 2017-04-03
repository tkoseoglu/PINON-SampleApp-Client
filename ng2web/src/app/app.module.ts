import * as $ from 'jquery';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppTopMenuComponent } from './app-top-menu/app-top-menu.component';
import { AppRouterModule } from './app-router/app-router.module';
import { HospitalComponent } from './hospital/hospital.component';
import { PatientComponent } from './patient/patient.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';

import { GlobalsService } from './globals.service';
import { GeneralService } from './general.service';
import { PatientService } from './patient.service';
import { HospitalService } from './hospital.service';

import { NgsmLoaderComponent, NgsmTablepagerComponent } from 'tolga-ng2-semantic-ui/src/app';
import { RegisterComponent } from './register/register.component';
import { LogoffComponent } from './logoff/logoff.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { PatientsComponent } from './patients/patients.component';
import { OrderByPipe } from './order-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AppTopMenuComponent,
    HospitalComponent,
    PatientComponent,
    HomeComponent,
    LoginComponent,
    ErrorComponent,
    NgsmLoaderComponent,
    NgsmTablepagerComponent,
    RegisterComponent,
    LogoffComponent,
    HospitalsComponent,
    PatientsComponent,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRouterModule
  ],
  providers: [GlobalsService, GeneralService, PatientService, HospitalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
