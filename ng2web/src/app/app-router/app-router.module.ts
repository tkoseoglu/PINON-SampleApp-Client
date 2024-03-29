import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HospitalComponent } from '../hospital/hospital.component';
import { PatientComponent } from '../patient/patient.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { ErrorComponent } from '../error/error.component';
import { RegisterComponent } from '../register/register.component';
import { LogoffComponent } from '../logoff/logoff.component';
import { HospitalsComponent } from '../hospitals/hospitals.component';
import { PatientsComponent } from '../patients/patients.component';
import { UnauthorizedComponent } from '../unauthorized/unauthorized.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'hospitals', component: HospitalsComponent },
  { path: 'newHospital', component: HospitalComponent },
  { path: 'editHospital/:id', component: HospitalComponent },
  { path: 'patients', component: PatientsComponent },
  
  { path: 'patient', component: PatientComponent },  
  { path: 'patient/:id', component: PatientComponent },  
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logoff', component: LogoffComponent },
  { path: 'accessDenied', component: UnauthorizedComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRouterModule { }
