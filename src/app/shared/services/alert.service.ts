import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class AlertConfig {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'danger' | 'primary' | 'secondary' | 'light' | 'dark';
  animation?: boolean = true;
  dismissible?: boolean = true;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private _onShow: Subject<AlertConfig[]> = new Subject<AlertConfig[]>();
  private _onClear: Subject<void> = new Subject<void>();

  constructor() { }

  public get onShow() {
    return this._onShow;
  }

  public get onHide() {
    return this._onShow;
  }

  public show(data: AlertConfig[]) {
    this._onShow.next(data);
  }

  public clear() {
    this._onClear.next();
  }

}
