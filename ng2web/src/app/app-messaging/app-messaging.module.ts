import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'toastr-ng2';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class AppMessagingModule {

  constructor(private toastrService: ToastrService) { }

  public displayError(message: string, title: string) {
    this.toastrService.error(title, message);
  }
  public displaySuccess(message: string, title: string) {
    this.toastrService.success(title, message);
  }
  public displayInfo(message: string, title: string) {
    this.toastrService.info(title, message);
  }
  public displayWarning(message: string, title: string) {
    this.toastrService.warning(title, message);
  }
 
}
