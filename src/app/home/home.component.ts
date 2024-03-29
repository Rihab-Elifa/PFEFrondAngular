import { Component, OnInit,NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Produit2 } from '../Models/Produit2';
import { VendorServicesService } from '../_services/vendor-services.service';
import { Article } from '../Models/Article';
import { Activity } from '../Models/Activity';
import { PanierService } from '../_services/panier.service';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { NotificationService } from '../_services/notification.service';
import { DeviceDto } from '../Models/DeviceDto';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { activityy } from '../Models/activityy';
import { UserServiceService } from '../_services/user-service.service';
import { MatDialog } from '@angular/material/dialog';
import { ArticleDetailComponent } from '../article-detail/article-detail.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  
})
export class HomeComponent  implements OnInit{
 alert=false;
  DeviceDto!:DeviceDto;
  Aa:any=["FOOD","PATISSERIE","MAGAZINE"]
  article?:Article[];
  Local?:Article[];
  center!:any;
  a!:Number;
  b!:Number;
  products:any[]=[];
  tabsearch:any[]=[{id:1,title:"pc hp"}
  ,
  {id:2,title:"pc asus"},{id:3,title:"pc dell"},
 
]


searchlist:string=""
searchvalue:string=""
  t!:any;
  selectedActivity:Activity= Activity.FOOD;
  durationInSeconds = 5;
  listeAct: string[] = activityy;
  user:any;
   // Créer une fonction pour convertir les chaînes en énumération
   getCategoryFromString(category: string): Activity {
    return Activity[category as keyof typeof Activity];
  }
  Restaurent:any[]=[];
  elect:any[]=[];
  e:any[]=[];
  rr:any[]=[];
htmlvalue=`<p style="color:red">inner html css</p>`
selectedCategory: any; 
ListAByCat:any[]=[];
recommande:any[]=[];
re:any[]=[];
  constructor(private _snackBar: MatSnackBar,private userServ:UserServiceService,private vendorServ:VendorServicesService,private panierSer:PanierService,private msg: AngularFireMessaging,private not:NotificationService,public dialog:MatDialog){}
  
 async ngOnInit() {
    this.vendorServ.getAllArticle().subscribe({
      next:(data)=>{
         this.article=data;
         console.log(data);
        
      },
      error: (e) => console.error(e) }) 
      
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const email = currentUser.email;
  
  this.userServ.getUserByemail(email)
  .subscribe({
    next: (data) => {
      this.user = data;
      this.vendorServ.recommander(this.user.id).subscribe({
        next:(data)=>{
          this.recommande=data;
               //construire une list de 3 pour le curseul
            console.log("recommanded liste",this.recommande)
 let groupeActuel: any[] = [];

 for (let i = 0; i < this.recommande.length; i++) {
   groupeActuel.push(this.recommande[i]);

   if (groupeActuel.length === 3 || i === this.recommande.length - 1) {
     this.re.push(groupeActuel);
     groupeActuel = [];
   }
 }

        }
      })
    
      
    },
    error: (e) => console.error(e)
  });

   
   //liste article local 
   /*  **********get postion user ********* */
   navigator.geolocation.getCurrentPosition((position) => {
  
    this.center = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
  
    };
    
    console.log("valeur positon user :lat "+this.center.lat);
    console.log("valeur positon user : ing"+this.center.lon);
    this.a=this.center.lat;
    this.b=this.center.lon;
    console.log(this.a,this.b);
    
   
    /*this.vendorServ.getLocal(this.selectedActivity,this.a,this.b).subscribe((data)=>{
      console.log(data);
    })*/
      this.vendorServ.getLocal(this.selectedActivity,this.a,this.b).subscribe(
      (data)=>{
       console.log('hello');
        this.Local= data;
         console.log("local article",data);
        
      }
  
    )
    console.log("local products ",this.Local);

    //sauvagrde position de user dans local storage
    //localStorage.setItem("Position", JSON.stringify({ lat: this.center.lat, lng: this.center.lng }));

  });
  /*********appel fonction ArticleLocal **********/
  //this.localArticle();
  this.panierSer.loadCart();
  this.products=this.panierSer.getProduct();
  console.log(this.products.length);

  //notification from firebase
  this.msg.getToken.subscribe(token => {
    this.t=token;

     //add divice pour get notification
  
   this.not.addDivce(token).subscribe(d=>{
     console.log("add device  successfly")
   }
  
 
 
   );

   this.msg.messages.subscribe(
    (payload) => {
    console.log("new message received. ", payload);
    
    })
    
 

    
    console.log(token);})

   
//categorie
this.vendorServ.getAllArticleByCat(Activity.FOOD).subscribe({
  next:(data)=>{
    this.Restaurent=data;
     console.log("FOOD",data);
     //construire une list de 3 pour le curseul

 let groupeActuel: any[] = [];

 for (let i = 0; i < this.Restaurent.length; i++) {
   groupeActuel.push(this.Restaurent[i]);

   if (groupeActuel.length === 3 || i === this.Restaurent.length - 1) {
     this.rr.push(groupeActuel);
     groupeActuel = [];
   }
 }
    
    
  },
  error: (e) => console.error(e)
 

}) 
this.vendorServ.getAllArticleByCat(Activity.ELECTRONIQUES).subscribe({
  next:(data)=>{
    this.elect=data;
     console.log("ELECTRONIQUES",data);
      //construire une list de 3 pour le curseul

 let groupeActuel: any[] = [];

 for (let i = 0; i < this.elect.length; i++) {
   groupeActuel.push(this.elect[i]);

   if (groupeActuel.length === 3 || i === this.elect.length - 1) {
     this.e.push(groupeActuel);
     groupeActuel = [];
   }
 }
    
  },
  error: (e) => console.error(e)

}) 

  
  }

  
 
//*******Add product to cart  */
addToCart(product:any){
  console.log(product);
  let pos=-1


let arr1=this.products.filter((element)=>{

  return element.page.id==product.page.id
})

if(arr1.length>0)
{
  let fproduct=this.products.find((v,index)=>{
return product.id===v.id
  })

  if(fproduct){
  this.products.forEach((elem)=>{

    if(elem.id===product.id){
      elem.quantity+=1
    }
  })
  }else{
    product.quantity=1
    this.products.push(product)
  }



}else{

  this.products=[]
  product.quantity=1
  this.products.push(product)
}
/**
   if(this.products.length===0){
    product.quantity=1;
    this.panierSer.addToCart(product);
    

  }else{

    let exist=false
  let y=false
this.products.forEach((element:any,index)=>{
if(element.page.id===product.page.id && element.id===product.id ){
 
    element.quantity+=1
  
   
  
  }

if( element.page.id===product.page.id && element.id!=product.id){
y=true
}

if(element.page.id!=product.page.id)

{exist=true}

  


 

/*  if(element.nom===product.nom){
element.quantity+=1
exist=true
  }else{
    product.quantity=1;
    this.panierSer.addToCart(product);
    exist=true
  }

}


})
if(y){
  product.quantity=1
 this.products.push(product)
}

console.log("exist ",exist)
if(!exist){
  this.products=[]
this.panierSer.clearProducts()
product.quantity=1;
this.products.push(product)

}

 */

      
   
    
   
  
  localStorage.setItem('cart_items', JSON.stringify(this.products));
this.products=[this.panierSer.getProduct()];
this.alert=true;
this._snackBar.open("add successfly", "#");

}



/** NOTE  serach  */
search(){
  /** table */
  console.log("search value",this.searchvalue)
  this.searchlist=""
  this.tabsearch.forEach((item)=>{
    let res=item.title.replace(this.searchvalue,`<span style="background:orange !important  ;">${this.searchvalue}</span>`)

    this.searchlist +=`<li style="color:black"> <a href="">${res}</a> </li> `
console.log(this.searchlist)

  })
  console.log("search list =>" ,this.searchlist)
}
//Liste du article by categorie 
loadArticlesByCategory(category: any): void {
  const selectedCategory = this.getCategoryFromString(category);
  this.vendorServ.getAllArticleByCat(selectedCategory).subscribe(
    (data) => {
      
     this.ListAByCat = data; // Assurez-vous que votre service renvoie les articles de la catégorie sélectionnée
     this.selectedCategory = category; // Définir la catégorie sélectionnée
     console.log("list du article by categorie recuperer ",data)
    },
    (error) => {
      console.error('Erreur lors de la récupération des articles de la catégorie.', error);
    }
  );
}
///***********************************detail articles */
detaisArticle(i:string):void {
  const dialogRef = this.dialog.open(ArticleDetailComponent, {
    data: {id:i},
  });

  dialogRef.afterClosed().subscribe(() => {
    console.log('The dialog was closed');
  
  });
}

}
