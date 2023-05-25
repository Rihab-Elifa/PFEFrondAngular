import { Component, OnInit } from '@angular/core';
import { Article } from '../Models/Article';
import { VendorServicesService } from '../_services/vendor-services.service';


@Component({
  selector: 'app-all-article',
  templateUrl: './all-article.component.html',
  styleUrls: ['./all-article.component.scss']
})
export class AllArticleComponent implements OnInit {
  article?:Article[];
  constructor(private vendorServ:VendorServicesService){};
  ngOnInit(): void {
    this.vendorServ.getAllArticle().subscribe({
      next: (data) => {
        this.article=data;
       
        console.log(data);
      },
      error: (e) => console.error(e)
    });
}



supprimer(id:string):void{
  this.vendorServ.deleteArticle(id).subscribe(() => {
    // code à exécuter après la suppression de la page
  });

}
    
  }
  
  

