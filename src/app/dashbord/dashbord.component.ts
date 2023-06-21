import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserServiceService } from '../_services/user-service.service';
import { VendorServicesService } from '../_services/vendor-services.service';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent {
  
    showFiller = false;
    listPages:any[]=[];
    
    act2:any[]=[];
    list:any[]=[];
    totalSales:any;
    selectedMenuItem: string = 'dashboard';
    us!:any;
    admintol:any;
    admintodayS:any;
    adminTRevenue:any;
    constructor(private route:ActivatedRoute,private auth:AuthService ,private userServ:UserServiceService,private vendor:VendorServicesService,private router:Router,private user:UserServiceService) { }

    ngOnInit() {
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
      const email = currentUser.email;
    
    this.userServ.getUserByemail(email)
    .subscribe({
      next: (data) => {
        this.us = data;
        console.log(this.us.id);
        
     
      },
      error: (e) => console.error(e)
    });
      this.vendor.getAllPages()
      .subscribe({
        next: (data) => {
          this.listPages=data;
          console.log(data);
       
         
        },
        error: (e) => console.error(e)
      });
  
      
      console.log("les paramters",this.act2,this.list)
      
 
    }

  logout():void{
    this.auth.clearToken();
  
  
  }
  
  }
  
  

  
  