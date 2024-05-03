import { Injectable } from '@angular/core';

declare var OneSignal: any;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  init(appId: string) {
    if (typeof OneSignal !== 'undefined') {
      OneSignal.init({
        appId: appId,
        allowLocalhostAsSecureOrigin: true,
        notifyButton: {
          enable: true,
        }
      });
    }
  }
}
