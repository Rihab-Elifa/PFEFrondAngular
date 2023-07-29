import { Component, OnInit } from '@angular/core';
import { VendorServicesService } from '../_services/vendor-services.service';
import { Activity } from '../Models/Activity';
@Component({
  selector: 'app-catgorie',
  templateUrl: './catgorie.component.html',
  styleUrls: ['./catgorie.component.scss']
})
export class CatgorieComponent implements OnInit {
elect:any;
  public constructor(private vendorServ:VendorServicesService){}
  ngOnInit(): void {
     this.vendorServ.getAllArticleByCat(Activity.ELECTRONIQUES).subscribe({
      next:(data)=>{
        this.elect=data;
         console.log("ELECTRONIQUES",data);
  
  }});
  }
;

}