import { Component, Input } from '@angular/core';
import { VendorServicesService } from '../_services/vendor-services.service';
import { Article } from '../Models/Article';
import { page2 } from '../Models/page2';
import { File } from '../Models/File';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.scss']
})
export class UpdateArticleComponent {
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
  constructor(private servVendor:VendorServicesService){}


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

