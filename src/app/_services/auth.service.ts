import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import{HttpClient,HttpHeaders} from '@angular/common/http'
import { Router } from '@angular/router';
const AUTH_API = 'http://localhost:8085/api/auth/login';
const AUTH_API2 = 'http://localhost:8085/api/auth/registerUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl= AUTH_API 
  private email!:string;
  private token !:string;
  private role!:string;
  private isLogin!:boolean;
  private firstName!:string;
  private lastName!:string;
  private phone!:string;

  constructor(private http: HttpClient ,private route:Router) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    this.email = currentUser && currentUser.email;
    this.token = currentUser && currentUser.token;
    this.role = currentUser&& currentUser.role;
    this.firstName=currentUser&&currentUser.firstName;
    this.lastName=currentUser&&currentUser.lastName;
    this.phone=currentUser&&currentUser.phone;
    
  }
  getToken(): string {
    return this.token;
  }
  getemail():string{
    return this.email;
  }

  getfirstName():string{
    return this.firstName;

  }
  getlastName(){
    return this.lastName;
  }
  getphone(){
    return this.phone;
  }


  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post(AUTH_API , {
        email:email,
        password: password,
      })
      .pipe(
          map((response: any) => {
        const token = response.token;
        const role = response.role;
        const lastName=response.lastName;
        const firstName=response.firstName;
        const phone=response.phone;
        
        if (token) {
          // set token property
          this.token = token;
          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem("currentUser", JSON.stringify({ email:email, token: token, role: role,firstName:firstName,lastName:lastName,phone:phone }));
          // get the current user from local storage and set the username, token and role properties
          const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
          this.email = currentUser.username;
          this.token = currentUser.token;
          this.role = currentUser.role;
          this.email=currentUser.firstName;
          this.lastName=currentUser.lastName;
          this.phone=currentUser.phone;
          
          // return true to indicate successful login
          return true;
        } else {
          // return false to indicate failed login
          return false;
        }
      })
      );
  }

  /*login(email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API,
      {
        email,
        password,
      }
    );
  }*/

  register(lastName:string,firstName: string, phone:Number,email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API2,
      {
        firstName,
        lastName,
        phone,
        email,
        password,
      }
    );
  }


  
  clearToken():void{
    localStorage.removeItem('currentUser')
    this.route.navigate(['/login'])
  }

 


}
