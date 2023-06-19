import { Component, Input, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import * as jwt from 'jsonwebtoken';
import { UserServiceService } from '../_services/user-service.service';
import { user } from '../Models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { EmailValidator } from '@angular/forms';
import { VendorServicesService } from '../_services/vendor-services.service';
import { page2 } from '../Models/page2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit  {
  verif=true
  selectedMenuItem:string="Edit";
  pages!:page2[];
  @Input()  users!:user[];
  
  user!:any;
  email!:string;
  subString!:string;
  router: any;
   t!:Number;
  firstPageId!:string;
  constructor(private userServ:UserServiceService,private vendorServ:VendorServicesService ,private authser:AuthService, private route:ActivatedRoute,private rout:Router){}
  

  ngOnInit(): void {
   
    //this.retrieveTutorials();
    this.retrieveTutorials();
    //let email=this.route.snapshot.paramMap.get('email');
   /* this.route.params.subscribe(params => {
       this.email = params['email'];
       /*autre example
       this.route.params.subscribe(
        (data)=>{
          this.email=data;
          console.log(data);
        }
       )*/

        // Récupérer le paramètre d'URL
    //this.Email = this.route.snapshot.paramMap.get('nom_du_parametre');
      // do something with email

    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
      const email = currentUser.email;
    
    this.userServ.getUserByemail(email)
    .subscribe({
      next: (data) => {
        this.user = data;
        if(this.user.etat == false){
          this.verif=false;
        }
        //this.firstPageId = this.user.ppg[0].id;
        console.log(data);
        console.log(this.user.id);
        
        //console.log(this.user.ppg[0].id);
        //let i = this.user.ppg[0].id;
        //console.log(i);
    
        //let position = this.email.indexOf("@");
         //this.subString = this.email.substring(0, position-1);
      },
      error: (e) => console.error(e)
    });
    
    console.log(this.user.ppg[0].id);
    //liste des pages 
    this.vendorServ.getAllP(this.user.id).subscribe({
      next: (rep) => {
        this.pages=rep;
        console.log(rep);
       
      },
      error: (e) => console.error(e)
    });
    this.t=this.pages.length;
    console.log(this.t);
  //});
  }
  

  retrieveTutorials(): void {
   /* this.userServ.getUser()
      .subscribe({
        next: (data) => {
          this.users= data;
          console.log(data);
         
        },
        error: (e) => console.error(e)
      });*/
  }
  click(){
    return this.users;
  }
  logout():void{
    this.authser.clearToken();
  

  }
 


}


