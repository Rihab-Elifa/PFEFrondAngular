import { Component, Inject, OnInit } from '@angular/core';
import { Article } from '../Models/Article';
import { VendorServicesService } from '../_services/vendor-services.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../_services/notification.service';
import { UserServiceService } from '../_services/user-service.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit{
  article!:Article;
  globalRat:any=0
  userRatNumber:number=0
  user!:any;
  constructor(private userServ:UserServiceService,private vend:VendorServicesService,private route:ActivatedRoute, public dialogRef: MatDialogRef<ArticleDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notif:NotificationService
  ) {}
  
  async ngOnInit() {
    
    
    
    let id=this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.vend.getArticle(this.data.id).subscribe({
      next:async (data) => {
        
       this.article=await data;
       console.log(data);
/**NOTE - get moyen of product rating */

console.log("article",this.article)
    this.notif.getMoy(this.article.id).subscribe(
       (data2)=>{
        this.globalRat= data2
        console.log("global rate data2",data2)
      }
    )

   
      },
      error: (e) => console.error(e)
    });


  
    ///////!SECTION
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const email = currentUser.email;
    
   this.userServ.getUserByemail(email)
    .subscribe({
      next: async(data) => {
        this.user =await data;
      
        /***NOTE - get gloabal rating of an article by user */
    this.notif.getRAtingBYUA(this.user.id,this.article.id).subscribe(
    
      (data)=>{
      
        console.log("rate number , data=",data)
        this.userRatNumber=data
      }
      )
        if(this.user.etat == false){
         
        }
       
        //this.firstPageId = this.user.ppg[0].id;
        console.log(data);
        console.log(this.user.id);
        

      },
      error: (e) => console.error(e)
    });


console.log("global rate ",this.globalRat)
  }
;




starclass(n:number){
this.userRatNumber=n
console.log(this.userRatNumber)

}

addRat(){
  this.notif.ajoutRating(this.user.id,this.article.id,this.userRatNumber).subscribe()

}


}
