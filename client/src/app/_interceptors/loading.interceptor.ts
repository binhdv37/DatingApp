import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {BusyService} from '../_services/busy.service';
import {delay, finalize} from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private busyService: BusyService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.busyService.busy(); // hien thi loading animation
    return next.handle(request).pipe(
      delay(1000), // delay 1s
      finalize( () => {
        this.busyService.idle(); // tat loading animation
      })
    );
  }
}
