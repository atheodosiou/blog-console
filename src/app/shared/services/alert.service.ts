import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public success(title: string, details?: string, timer?: number, toast?: boolean) {
    const options: SweetAlertOptions = {
      titleText: title,
      text: details,
      showConfirmButton: false,
      timer: timer ? timer : undefined,
      icon: 'success',
      toast: toast ? toast : false,
      position: toast && toast === true ? 'top-right' : 'center'
    };
    Swal.fire(options);
  }

  public info(title: string, details?: string, timer?: number, toast?: boolean) {
    const options: SweetAlertOptions = {
      titleText: title,
      text: details,
      showConfirmButton: false,
      timer: timer ? timer : undefined,
      icon: 'info',
      toast: toast ? toast : false,
      position: toast && toast === true ? 'top-right' : 'center'
    };
    Swal.fire(options);
  }

  public warning(title: string, details?: string, timer?: number, toast?: boolean) {
    const options: SweetAlertOptions = {
      titleText: title,
      text: details,
      showConfirmButton: false,
      timer: timer ? timer : undefined,
      icon: 'warning',
      toast: toast ? toast : false,
      position: toast && toast === true ? 'top-right' : 'center'
    };
    Swal.fire(options);
  }

  public error(title: string, details?: string, timer?: number, toast?: boolean) {
    const options: SweetAlertOptions = {
      titleText: title,
      text: details,
      showConfirmButton: false,
      timer: timer ? timer : undefined,
      icon: 'error',
      toast: toast ? toast : false,
      position: toast && toast === true ? 'top-right' : 'center'
    };
    Swal.fire(options);
  }

  public question(title: string, details?: string, timer?: number, toast?: boolean) {
    const options: SweetAlertOptions = {
      titleText: title,
      text: details,
      showConfirmButton: false,
      timer: timer ? timer : undefined,
      icon: 'question',
      toast: toast ? toast : false,
      position: toast && toast === true ? 'top-right' : 'center'
    };
    Swal.fire(options);
  }
}
