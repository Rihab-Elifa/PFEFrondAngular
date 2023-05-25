import { Component, OnInit } from '@angular/core';
import { Produit2 } from '../Models/Produit2';
import { VendorServicesService } from '../_services/vendor-services.service';
import { Article } from '../Models/Article';
import { Activity } from '../Models/Activity';
import { PanierService } from '../_services/panier.service';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { NotificationService } from '../_services/notification.service';
import { DeviceDto } from '../Models/DeviceDto';
;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit{
 
  DeviceDto!:DeviceDto;
  Aa:any=["FOOD","PATISSERIE","MAGAZINE"]
  article?:Article[];
  Local?:Article[];
  center!:any;
  a!:Number;
  b!:Number;
  products:any[]=[];
  t!:any;
  selectedActivity:Activity= Activity.FOOD;
  constructor(private vendorServ:VendorServicesService,private panierSer:PanierService,private msg: AngularFireMessaging,private not:NotificationService){}
  ngOnInit(): void {
    this.vendorServ.getAllArticle().subscribe({
      next:(data)=>{
         this.article=data;
         console.log(data);
        
      },
      error: (e) => console.error(e)

    }) 
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
    this.vendorServ.getLocal(this.selectedActivity,this.a,this.b).subscribe({
      next:(data)=>{
       console.log('hello');
        this.Local=data;
         console.log(data);
         console.log(this.Local);
        
      }
  
    })
  
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

}

}
