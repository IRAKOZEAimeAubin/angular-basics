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
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YzVhMjZkYy01N2Y3LTRjNjctYjRmZi1mN2M3YWFhMDY2MDkiLCJpYXQiOjE2OTI4MDE3NjgsImV4cCI6MTY5Mjg4ODE2OH0.-0rO_brHrKChjvyHQ9ZuEWRpMJg9KW0wgNbB6dgqKZE',
      },
    });

    return next.handle(jsonReq);
  }
}
