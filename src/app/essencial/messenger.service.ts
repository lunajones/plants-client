import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class Messenger {

  constructor(private toastrService: ToastrService) {}


  public showErrorMessage(message: any) {
    this.toastrService.error(message, 'Error', {
      timeOut: 3000,
    });
  }

  public showSuccessMessage(message: any) {
    this.toastrService.success(message, 'Done', {
      timeOut: 3000,
    });
  }

  public showInfoMessage(message: any) {
    this.toastrService.info(message, 'FYI', {
      timeOut: 3000,
    });
  }

  public showWarningMessage(message: any) {
    this.toastrService.warning(message, 'Attention', {
      timeOut: 3000,
    });
  }
}