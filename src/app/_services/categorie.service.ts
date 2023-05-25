import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categorie } from '../Models/Categorie';
 const  baseURL ="http://localhost:8085/api/auth/findAll";
 const  baseURL2 ="http://localhost:8085/api/auth/add";
 const  baseURL3 ="http://localhost:8085/api/auth/delete";
 const  baseURL4 ="http://localhost:8085/api/auth/findById/{id}";
 const  baseURL5 ="http://localhost:8085/api/auth/modifier";
 @Injectable({
  providedIn: 'root'
})
export class CategorieService {
 

  constructor( private http:HttpClient) { }
  //get all categorie
  getAll(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(baseURL);
  }
  //get categorie par id 
  get(id:any):Observable<Categorie>{
    return this.http.get<Categorie>('${baseURL4}/${id}');
  }
  //create categorie
  create(data: any): Observable<any> {
    return this.http.post(baseURL2 , data);
  }
  //delete categorie
  delete():Observable<any>{
    return this.http.delete(baseURL3);
  }
  //update  categorie
  update(id:any,data:any):Observable<any>{
    return this.http.put('${baseURL5}/${id}',data);
  }

}
