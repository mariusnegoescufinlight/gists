import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../environments/environment";

@Injectable()
export class GithubAuthenticationInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      request = request.clone({
          headers: request.headers.set('Accept', 'application/vnd.github+json')
      });

      if ('' !== environment.githubToken){
          request = request.clone({
              headers: request.headers.set('Authorization', 'Bearer ' + environment.githubToken)
          });
      }

        return next.handle(request);
    }
}
