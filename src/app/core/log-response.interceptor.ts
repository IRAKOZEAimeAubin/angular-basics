import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LogResponseInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(`LogResponseInterceptor - ${request.url}`);

    return next.handle(request).pipe(
      tap((event) => {
        if (event.type === HttpEventType.Response) console.log(event);
      })
    );
  }
}
