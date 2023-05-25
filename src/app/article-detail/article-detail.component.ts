import { Component, OnInit } from '@angular/core';
import { Article } from '../Models/Article';
import { VendorServicesService } from '../_services/vendor-services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit{
  article!:Article;
  constructor(private vend:VendorServicesService,private route:ActivatedRoute){}
  
  ngOnInit(): void {
    let id=this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.vend.getArticle(id).subscribe({
      next: (data) => {
       this.article=data;
       console.log(data);

      },
      error: (e) => console.error(e)
    });
    
  }
;


}
