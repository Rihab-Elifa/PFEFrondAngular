import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  private baseUrl1 = 'http://localhost:8085/social/google';
  private baseUrl2 = 'http://localhost:8085/social/facebook';

  constructor(private http:HttpClient) { }
  loginWithGoogle(token: any): Observable<any>{
    // @ts-ignore
    return this.http.post<any>(this.baseUrl1, {token}).pipe(
      map(
        response => {
          sessionStorage.setItem('token','Bearer ' + response.token);
          return response;
        }
      )
    );
      }
    loginWithFacebook(token: any): Observable<any>{
      return this.http.post<any>(this.baseUrl2, {token}).pipe(
        map(
          response => {
            sessionStorage.setItem('token',response.token);
            return response;
          }
        )
      );
    }
    
  }

