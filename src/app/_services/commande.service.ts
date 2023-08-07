import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commande } from '../Models/Commande';
const AUTH_API = 'http://localhost:8085/api/auth/AjoutCommande';
const AUTH_API1 = 'http://localhost:8085/api/auth/caisseNotif';
const AUTH_API2 = 'http://localhost:8085/api/auth/getAll';
const AUTH_API3 = 'http://localhost:8085/api/auth/getListNotification';
const AUTH_API4 = 'http://localhost:8085/api/auth/getCaisse';
const AUTH_API5 = 'http://localhost:8085/api/auth/caisseListClient';
const AUTH_API6 = 'http://localhost:8085/api/auth/caisseListVendor';
const AUTH_API7 = 'http://localhost:8085/api/auth/cancelOrderByVendor';
const AUTH_API8 = 'http://localhost:8085/api/auth/AcceptOrderByVendor';
const AUTH_API9 = 'http://localhost:8085/api/auth/cancelOrderByClient';


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
   getAll():Observable<any>{
    return this.http.get(AUTH_API2);
  }
  //get list notification
  getAllNotification():Observable<any>{
    return this.http.get(AUTH_API3);
  }
  //get commande by id
   getCommandeById(id:string):Observable<any>{
    return this.http.get(`${AUTH_API4}/${id}`);
  }
  //get list client 
  ClientC(id:string|null):Observable<any>{
    return this.http.get(`${AUTH_API5}/${id}`);
  }
  //get list vendeur
  getvendeurC(id:string|null):Observable<any>{
    return this.http.get(`${AUTH_API6}/${id}`);
  }
  //cancel commande by vendeur
  ConcelCByV(id:string|null):Observable<any>{
    return this.http.get(`${AUTH_API7}/${id}`);
  }
   //Accept commande by vendeur
   AcceptCByV(id:string|null):Observable<any>{
    return this.http.get(`${AUTH_API8}/${id}`);
  }
  //concel order by client
     ConcelByC(id:string|null):Observable<any>{
      return this.http.get(`${AUTH_API9}/${id}`);
    }

}
