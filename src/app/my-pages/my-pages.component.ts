import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorServicesService } from '../_services/vendor-services.service';
import { page } from '../Models/page';
import { page2 } from '../Models/page2';

@Component({
  selector: 'app-my-pages',
  templateUrl: './my-pages.component.html',
  styleUrls: ['./my-pages.component.scss']
})
export class MyPagesComponent implements OnInit {
  pages!:page2[];
  idUser!:string|null;
   constructor(private route:ActivatedRoute,private router:Router,private vendorServ:VendorServicesService){};
  ngOnInit(): void {
    let id=this.route.snapshot.paramMap.get('id');
    this.idUser=id;
    console.log(id);
    console.log(this.idUser);
    this.vendorServ.getAllP(id).subscribe({
      next: (data) => {

        this.pages= data;
        console.log(data);
       
      
      },
      error: (e) => console.error(e)
    });
    


  }

  detail(id:string):void{
    this.router.navigate(['detailP/${id}']);

  }
  remove(idPage:string):void{
    this.vendorServ.deletePage(this.idUser,idPage).subscribe(() => {
      // code à exécuter après la suppression de la page
    });
  }


  

}
