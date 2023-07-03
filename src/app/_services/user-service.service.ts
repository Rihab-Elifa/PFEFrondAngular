
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../Models/user';
import { Observable } from 'rxjs';
import { user2 } from '../Models/user2';
import { u } from '../Models/u';
const baseURL ="http://localhost:8085/User/edit";
const baseURL3="http://localhost:8085/User";
const baseURL4="http://localhost:8085/User/email";


const baseURL5="http://localhost:8085/User/todayRevenue";
const baseURL6="http://localhost:8085/User/weekRevenue";
const baseURL7 ="http://localhost:8085/User/monthRevenue";
const baseURL8 ="http://localhost:8085/User/todaySales";
const baseURL9 ="http://localhost:8085/User/totalSales";
const baseURL10 ="http://localhost:8085/api/auth/Livreurs";
const baseURL11 ="http://localhost:8085/api/auth/Admins";
const baseURL12 ="http://localhost:8085/api/auth/UpdateSolde";
const baseURL13="http://localhost:8085/api/auth/Etat";
const baseURL14="http://localhost:8085/User/VendeurTotalRevenu";
const baseURL15="http://localhost:8085/User/VendeurSalesToday";
const baseURL16="http://localhost:8085/User/VendeurSalesTotal";
const  baseURL18="http://localhost:8085/User/VendeurTodayR";
const baseURL19 ="http://localhost:8085/api/auth/UpdateSoldeSousAdmin";
const baseURL20="http://localhost:8085/api/auth/Reset";
const baseURL21 ="http://localhost:8085/api/auth/PagesSoldeSousAdmin";
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
 
  private const  ="http://localhost:8085/User/listeUser";
  private const2  ="http://localhost:8085/User/AdminTotalRevenu";
  private const3  ="http://localhost:8085/User/AdminRevenu";
  
  constructor(private http: HttpClient) { }
 

  getUserById(id:String|null ): Observable<user> {
    return this.http.get<user>(`${baseURL3}/${id}`);
  }

  getUserByemail(email:String): Observable<u> {

    return this.http.get<u>(`${baseURL4}/${email}`);
  }


  Client():Observable<any[]>{
    return this.http.get<any[]>(this.const );
  }



  updateUser(user:user): Observable<any>{
  
    return this.http.put<String>(baseURL, user);
  }
  //today revenue
  todayRevenue(id:String|null ): Observable<any> {
    return this.http.get(`${baseURL5}/${id}`);
  }
  //week revenue
  weekRevenue(id:String|null ): Observable<any> {
    return this.http.get(`${baseURL6}/${id}`);
  }
  //month revenue
  monthRevenue(id:String|null ): Observable<any> {
    return this.http.get(`${baseURL7}/${id}`);
  }
  //Todaysales
  TodaySales(): Observable<any> {
    return this.http.get(baseURL8);
  }
  //TotalSales
  TotaleSales( ): Observable<any> {
    return this.http.get(baseURL9);
  }

  //listLivreurs
   
   Livreurs( ): Observable<any> {
    return this.http.get(baseURL10);
  }
  //list admin

  Admin( ): Observable<any> {
    return this.http.get(baseURL11);
  }
  //revenu total du admin 
  Admintot( ): Observable<any> {
    return this.http.get(this.const2);
  }
  //revenu du admin today
  today( ): Observable<any> {
    return this.http.get(this.const3);
  }
   //update solde
   setSold(id:String,i:Number): Observable<any> {

    return this.http.put(`${baseURL12}/${id}`,i);
  }
//bloquer
bloquer(id:String): Observable<any> {
  return this.http.put(`${baseURL13}/${id}`,'');
}
//vendeur 
//total revenu vendeur
VendeurReT(id:String |null ): Observable<any> {
  return this.http.get(`${baseURL14}/${id}`);
}
VendeurReToday(id:String |null): Observable<any> {
  return this.http.get(`${baseURL18}/${id}`);
}
//vendeurs sales today
SalsT(id:String |null): Observable<any> {
  return this.http.get(`${baseURL15}/${id}`);
}
//Vedeurs sales total
VSTotat(id:String |null): Observable<any> {
  return this.http.get(`${baseURL16}/${id}`);
}
//update solde with sous admin
sousAdminsolde(id:String,id2:string,i:Number): Observable<any> {

  return this.http.put(`${baseURL19}/${id}/${id2}`,i);
}
//reset
Reset(id:String): Observable<any> {
return this.http.put(`${baseURL20}/${id}`,'');
}
//update solde pages with sous admin
PagesAdminsolde(id:String,id2:string,i:Number): Observable<any> {

  return this.http.put(`${baseURL21}/${id}/${id2}`,i);
}

}
