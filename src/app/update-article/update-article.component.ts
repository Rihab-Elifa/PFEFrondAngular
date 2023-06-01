import { Component, Input, OnInit } from '@angular/core';
import { VendorServicesService } from '../_services/vendor-services.service';
import { Article } from '../Models/Article';
import { page2 } from '../Models/page2';
import { File } from '../Models/File';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.scss']
})
export class UpdateArticleComponent implements OnInit{
  isUpdated=false;
  @Input() article:Article={
    id: '',
    nom: '',
    description: '',
    prix: 0,
    nbstock: 0,
    page: new page2,
    image: new File
  }
  constructor(private servVendor:VendorServicesService,private route:ActivatedRoute){}
  ngOnInit(): void {
    let id=this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.servVendor.getArticle(id).subscribe({
      next: (data) => {
       this.article=data;
       console.log(data);

      },
      error: (e) => console.error(e)
    });
  }



  UpdateArticle(){
    this.servVendor.updateArticle(this.article).subscribe(
    {
      next:(res)=>{
        console.log('Article updated successfully:', res);
       this.isUpdated=true;
      },
      error:(e)=>console.error(e)
    }
    
  );
  }


}

