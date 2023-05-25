
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../Models/user';
import { Observable } from 'rxjs';
const baseURL ="http://localhost:8085/User/edit";
const baseURL3="http://localhost:8085/User";
const baseURL4="http://localhost:8085/User/email";

const baseURL2 ="http://localhost:8085/User/listeUser";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
 
  


  constructor(private http: HttpClient) { }
 

  getUserById(id:String|null ): Observable<user> {
    return this.http.get<user>(`${baseURL3}/${id}`);
  }

  getUserByemail(email:String): Observable<user> {

    return this.http.get<user>(`${baseURL4}/${email}`);
  }


  getUser():Observable<user[]>{
    return this.http.get<user[]>(baseURL2);
  }



  updateUser(user:user): Observable<any>{
  
    return this.http.put<String>(baseURL, user);
  }

}
