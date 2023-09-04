import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceDto } from '../Models/DeviceDto';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private  AUTH_API = 'http://localhost:8085/api/auth/caisseNotif';
  private  AUTH_API1 = 'http://localhost:8085/notification/addDevice';
  private  AUTH_API2 = 'http://localhost:8085/article/addRating';
  private  AUTH_API3 = 'http://localhost:8085/article/RatingUpdate';
  private  AUTH_API4 = 'http://localhost:8085/article/delRating';
  private  AUTH_API5 = 'http://localhost:8085/article/moyRating';
  private  AUTH_API6 = 'http://localhost:8085/article/EtatRating';
  private  AUTH_API7 = 'http://localhost:8085/article/getReat';
  constructor(private http:HttpClient) { }

  getNotification(id:string ): Observable<any>{
   
    return this.http.get( `${this.AUTH_API}/${id}`);
  }

  //add divice 
  addDivce(token:any):Observable<any>{
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const email = currentUser.email;
    const deviceDto: DeviceDto = {
      token: token,
      email: email
      
    };
    return this.http.post(this.AUTH_API1,deviceDto);
  }
  /******************************Rating pour les articles */
  /**************ajout rating */
  ajoutRating(id:string,idart:string,r:any): Observable<any>{
  
    return this.http.post(`${this.AUTH_API2}/${id}/${idart}`,r);
  }
  /**************update rating */

  updateRating(id:string,int:any): Observable<any>{
  
    return this.http.put<String>(`${this.AUTH_API3}/${id}`, int);
  }

  //deleteRating
deleteRating(iduser:string|null):Observable<any>{
  return this.http.delete(`${this.AUTH_API4}/${iduser}`);


}
///calcule moyenne rating
getMoy(iduser:string):Observable<any>{
  return this.http.get(`${this.AUTH_API5}/${iduser}`);


}
/***NOTE -  verification */
verif(idU: any, idA: any): Observable<boolean> {
  return this.http.get<boolean>(`${this.AUTH_API6}/${idU}/${idA}`);
}
//get rating by user and article
//Vedeurs sales total
getRAtingBYUA(id:any,idA:any): Observable<any> {
  return this.http.get(`${this.AUTH_API7}/${id}/${idA}`);
}




  
}
