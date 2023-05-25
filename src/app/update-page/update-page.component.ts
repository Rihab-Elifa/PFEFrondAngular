import { Component, Input, OnInit } from '@angular/core';
import { page } from '../Models/page';
import { UserServiceService } from '../_services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorServicesService } from '../_services/vendor-services.service';
import { Region } from '../Models/Region';
import { activityy } from '../Models/activityy';
import { page2 } from '../Models/page2';
import { File } from '../Models/File';

@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styleUrls: ['./update-page.component.scss']
})
export class UpdatePageComponent  implements OnInit{
  @Input() page:any;
   id!:string|null;
 
  constructor(private vendorSer: VendorServicesService,
    private route: ActivatedRoute,
    private router: Router) { }
   
  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id');
    console.log(this.id);

    
    
   
    
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
