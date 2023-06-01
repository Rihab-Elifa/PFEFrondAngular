import { Component, Input, OnInit } from '@angular/core';
import { page } from '../Models/page';
import { UserServiceService } from '../_services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorServicesService } from '../_services/vendor-services.service';
import { Region } from '../Models/Region';
import { activityy } from '../Models/activityy';
import { page2 } from '../Models/page2';
import { File } from '../Models/File';
import { p } from '../Models/p';

@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styleUrls: ['./update-page.component.scss']
})
export class UpdatePageComponent  implements OnInit{
  page:p={
    id: '',
    title: '',
    address: '',
    email: '',
    phone: 0,
 
    postalCode: 0,
   

  }
   id!:string|null;
 
  constructor(private vendorSer: VendorServicesService,
    private route: ActivatedRoute,
    private router: Router) { }
   
  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id');
    let id=this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.vendorSer.getPage(id).subscribe({
      next: (data) => {
       this.page=data;
       console.log(data);

      },
      error: (e) => console.error(e)
    });

    
    
   
    
  }
    
  
  

  updatePage():void{ 
    this.vendorSer.updatePage(this.id,this.page)
    .subscribe({
      next: (data) => {
          console.log('page updated successfully:', data);
        },
        error:(e)=>console.error(e)
      }
      
    );
  }


}
