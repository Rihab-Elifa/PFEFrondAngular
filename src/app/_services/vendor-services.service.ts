import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, tap } from 'rxjs';
import { page } from '../Models/page';
import { page2 } from '../Models/page2';
import { Produit2 } from '../Models/Produit2';
import { Produit } from '../Models/Produit';
import { Article } from '../Models/Article';
import { Article2 } from '../Models/Article2';
import { Activity } from '../Models/Activity';


const AUTH_API = 'http://localhost:8085/pages/findAllPages';
const baseURL2 ="http://localhost:8085/api/auth/ListProduit";
@Injectable({
  providedIn: 'root'
})
export class VendorServicesService {
  private apiUrl = 'http://localhost:8085/pages';
  private  baseURL ="http://localhost:8085/pages/PagesUser";
  private apiUrl2 = 'http://localhost:8085/pages/detailPage';
  private apiUrl3 = 'http://localhost:8085/article/addArticle';
  private apiUrl4 = 'http://localhost:8085/pages/editPage';
  private apiUrl5= 'http://localhost:8085/pages/delete';
  private apiUrl6= 'http://localhost:8085/article/editArticle';
  private apiUrl7= 'http://localhost:8085/article/deleteArticle';
  private apiUrl8= 'http://localhost:8085/article/getarticle';
  private apiUrl9= 'http://localhost:8085/article/ListeArticle';
  private apiUrl10= 'http://localhost:8085/article/findArticlesByPage';
  private apiUrl11= 'http://localhost:8085/article/articlesLocal';
  private apiUrl12= 'http://localhost:8085/pages/editPage';
  private apiUrl13= 'http://localhost:8085/pages/findAllPages';

  
  
  
 
  constructor(private http:HttpClient) { }

 private  _loading$=new BehaviorSubject<boolean>(false);
  get loading$(): Observable<boolean>{
    return this._loading$.asObservable();
  }

  private _vendors$=new BehaviorSubject<page2[]>([]);
  get vendors$():Observable<page2[]>{
    return this._vendors$.asObservable();
  }

  private setLoadingStatus(loading:boolean){
    this._loading$.next(loading);
  }
  //liste des pages vendor
  getVendorFromServer(){


   this.setLoadingStatus(true);
    this.http.get<page2[]>(AUTH_API).pipe(
      delay(1000),
      tap(vs => {
        this._vendors$.next(vs);
        this.setLoadingStatus(false);
      })
    ).subscribe();
}
//add page 

ajouterPage(id: string, pagesDto: any, imageProfile: File, imageCouverture: File): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('page', new Blob([JSON.stringify(pagesDto)],{type: 'application/json'}));
  if (imageProfile) {
    formData.append('imageProfile', imageProfile);
  }
  if (imageCouverture) {
    formData.append('imageCouverture', imageCouverture);
  }
    // Spécification des en-têtes
    const headers = new HttpHeaders();
    headers.append('enctype', 'multipart/form-data'); // Spécifier le type d'encodage du formulaire
    const options = { headers: headers };
  return this.http.post(`${this.apiUrl}/addPage/${id}`, formData,options);
}
 //list pages du user
 getAllP(id:string|null): Observable<page2[]> {
  return this.http.get<page2[]>(`${this.baseURL}/${id}`);
}
 //list pages 
 getAllPages(): Observable<page2[]> {
  return this.http.get<page2[]>(this.apiUrl13);
}

//detail de page
getPage(id:string|null):Observable<page2>{
  return this.http.get<page2>(`${this.apiUrl2}/${id}`);
}
//Update page
updatePage(id:string|null,p:any): Observable<string>{
  
  return this.http.put<string>(`${this.apiUrl4}/${id}`, p );
}

//deletepage
deletePage(iduser:string|null,idPage:string):Observable<any>{
  return this.http.delete(`${this.apiUrl5}/${iduser}/${idPage}`);


}
//edit photo profile
editPagephoto(id:string|null,imageProfile:File):Observable<any>{
  const formData: FormData = new FormData();
  if (imageProfile) {
    formData.append('image', imageProfile);
  }
   const headers = new HttpHeaders();
   headers.append('enctype', 'multipart/form-data'); // Spécifier le type d'encodage du formulaire
   const options = { headers: headers };

   return this.http.post(`${this.apiUrl12}/${id}`, formData,options);


}

//***********************************Gestion Produit */
//add produit
ajouterProduit(id: string, pagesDto: Article2, imageProfile: File): Observable<any> {
  const formData: FormData = new FormData();
  formData.append('article', new Blob([JSON.stringify(pagesDto)],{type: 'application/json'}));
  if (imageProfile) {
    formData.append('image', imageProfile);
  }
  
  // Spécification des en-têtes
    const headers = new HttpHeaders();
    headers.append('enctype', 'multipart/form-data'); // Spécifier le type d'encodage du formulaire
    const options = { headers: headers };
  return this.http.post(`${this.apiUrl3}/${id}`, formData,options);
}
//list du produit
getProduit():Observable<Produit2[]>{
  return this.http.get<Produit2[]>(baseURL2);
}

updateArticle(article:any): Observable<any>{
  
  return this.http.put(this.apiUrl6, article );
}

//delete Article
deleteArticle(id:string):Observable<any>{
  return this.http.delete(`${this.apiUrl7}/${id}`,{reportProgress: true, observe: 'events'});


}

//detail de article 
getArticle(id:string|null):Observable<Article>{
  return this.http.get<Article>(`${this.apiUrl8}/${id}`);
}
//liste des articles

getAllArticle(): Observable<Article[]> {
  return this.http.get<Article[]>(this.apiUrl9);
}

//Liste articles by page 
getAllArticleByPage(id:string|null): Observable<Article[]> {
  return this.http.get<Article[]>(`${this.apiUrl10}/${id}`);
}

//get local article 
getLocal(a:Activity,lat:Number,lon:Number):Observable<any>{
  const options = { headers: a };
  return this.http.post<Article[]>(`${this.apiUrl11}/${lat}/${lon}`,a);
}




}
