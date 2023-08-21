import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const CONTENT_TYPE = new HttpContextToken(() => 'application/json');

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(`AddHeaderInterceptor - ${request.url}`);

    let jsonReq: HttpRequest<any> = request.clone({
      setHeaders: {
        'Content-Type': request.context.get(CONTENT_TYPE),
      },
    });

    return next.handle(jsonReq);
  }
}
