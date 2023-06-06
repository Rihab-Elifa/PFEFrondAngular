import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commande } from '../Models/Commande';
const AUTH_API = 'http://localhost:8085/api/auth/AjoutCommande';
const AUTH_API1 = 'http://localhost:8085/api/auth/caisseNotif';
const AUTH_API2 = 'http://localhost:8085/api/auth/getAll';


@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private http:HttpClient) { }

  
  AddCommade(commande:Commande): Observable<any>{
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
  
    return this.http.post<String>(AUTH_API, commande);
  }
  //get notification 
  getNotification(id:string|null):Observable<any>{
    return this.http.get(`${AUTH_API1}/${id}`);
  }
  //get All commande 

   //get notification 
   getAll():Observable<any>{
    return this.http.get(AUTH_API2);
  }
}
