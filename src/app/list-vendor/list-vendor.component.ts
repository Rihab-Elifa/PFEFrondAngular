import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../Models/user';
import { VendorServicesService } from '../_services/vendor-services.service';
import { page } from '../Models/page';
import { page2 } from '../Models/page2';

@Component({
  selector: 'app-list-vendor',
  templateUrl: './list-vendor.component.html',
  styleUrls: ['./list-vendor.component.scss']
})
export class ListVendorComponent implements OnInit {

  loading$!: Observable<boolean>;
  vendors$!: Observable<page2[]>;
  constructor(private vendorService:VendorServicesService){}

  ngOnInit(): void {
    this.initObservables();
    this.vendorService.getVendorFromServer();    }

  private initObservables(){

    this.loading$=this.vendorService.loading$;
    this.vendors$=this.vendorService.vendors$;
  }

}
