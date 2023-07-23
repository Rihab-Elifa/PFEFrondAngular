import { Component, Inject, OnInit } from '@angular/core';
import { Article } from '../Models/Article';
import { VendorServicesService } from '../_services/vendor-services.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit{
  article!:Article;
  constructor(private vend:VendorServicesService,private route:ActivatedRoute, public dialogRef: MatDialogRef<ArticleDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  
  ngOnInit(): void {
    let id=this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.vend.getArticle(this.data.id).subscribe({
      next: (data) => {
       this.article=data;
       console.log(data);

      },
      error: (e) => console.error(e)
    });
    
  }
;


}
