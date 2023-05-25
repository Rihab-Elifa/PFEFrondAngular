import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from '../Models/user';
import { UserServiceService } from '../_services/user-service.service';

@Component({
  selector: 'app-profile-vendor',
  templateUrl: './profile-vendor.component.html',
  styleUrls: ['./profile-vendor.component.scss']
})
export class ProfileVendorComponent implements OnInit{
  user!:user;
  string!:string;
  constructor(private route:ActivatedRoute,private userServ:UserServiceService){};
  ngOnInit(): void {
   
  

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const email = currentUser.email;

this.userServ.getUserByemail(email)
.subscribe({
  next: (data) => {
    this.user = data;
    //this.firstPageId = this.user.ppg[0].id;
    console.log(data);
    console.log(this.user.id);
  
  },
  error: (e) => console.error(e)
});

  }
}
