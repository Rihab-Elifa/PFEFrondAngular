import { Component, OnInit } from '@angular/core';
import { VendorServicesService } from '../_services/vendor-services.service';
import { page2 } from '../Models/page2';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../Models/Article';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {
 
  article?:Article[];
  page2!:page2;
  image!:File;
  b=false;
  constructor(private vendorServ:VendorServicesService,private route:ActivatedRoute){}
  ngOnInit(): void {
    let id=this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.vendorServ.getPage(id).subscribe({
      next: (data) => {
       this.page2=data;
       console.log(data);

      },
      error: (e) => console.error(e)
    });
    this.vendorServ.getAllArticleByPage(id).subscribe({
      next: (data) => {
       this.article=data;
       console.log(data);

      },
      error: (e) => console.error(e)
    });
   
    
  
  } 
  onProfilImageSelected(event: any): void {
    this.image= event.target.files[0];
  }

  click(){
  this.b=true;
  }
 //Edit photo profile 
  changePhoto(id:string):void{
    this.vendorServ.editPagephoto(id,this.image).subscribe({
      next: (data) => {
        console.log("image update successful");
        
 
       },
       error: (e) => console.error(e)

    })

   }
   supprimer(id:string):void{
    this.vendorServ.deleteArticle(id).subscribe(() => {
      // code à exécuter après la suppression de la page
    });}
    
  }
  //how get detail page image +data angular 15?

 


