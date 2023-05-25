import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    //return next.handle(request);
    //SI token a insérer dans le header
    const token =this.auth.getToken();
    if(token !==null){
      let clone=request.clone({
        headers: request.headers.set('Authorization','bearer'+token)
      })
      console.log(clone)
      return next.handle(clone).pipe(
        catchError(error => {
          console.log(error)
          if(error.status===401){
            this.auth.clearToken();
          }
          return throwError('session Expired')
        }
        )
      )
    }
    return next.handle(request);
  }
}

    export const TokenInterceptorProvider={
      provide:HTTP_INTERCEPTORS,
       useClass:TokenInterceptor,
      multi:true

        }
