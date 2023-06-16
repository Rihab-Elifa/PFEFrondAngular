import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../_services/user-service.service';
import { user } from '../Models/user';
import { PanierService } from '../_services/panier.service';
import { Commande } from '../Models/Commande';
import { CommandeService } from '../_services/commande.service';
import { NotificationService } from '../_services/notification.service';
import { DeviceDto } from '../Models/DeviceDto';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { AngularFireModule } from '@angular/fire/compat';
import { MessagingService } from '../_services/messaging.service';

@Component({
  selector: 'app-commander',
  templateUrl: './commander.component.html',
  styleUrls: ['./commander.component.scss']
})
export class CommanderComponent implements OnInit {
  
  now= new Date();
  user:user={
    id: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: null,
    ppg: []
  }
  products:any[]=[];
  Total!: any;
  qty:any
  name:any;
  somme:any;
  vendorId:any;
  vendorT:any;
  vendorE:any;
  Commande:Commande={
    
  
    idSender: '',
    address: '',
    city: '',
    streetAddress: '',
    phone: '',
    selectedTime: '',
    description: '',
    idVendor: '',
   
    totalPrice: 0,
    articles: []
  }
  DeviceDto!:DeviceDto;
  token:any;
  constructor(private route:ActivatedRoute,private userServ:UserServiceService,private panier:PanierService,private CommandeServ:CommandeService,private not:NotificationService,private msg:AngularFireMessaging,private ms:MessagingService){}

  ngOnInit(): void {
    //let id=this.route.snapshot.paramMap.get('p');
   // console.log(id);
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
      const email = currentUser.email;

      this.getUser(email);

      this.panier.loadCart();
    this.products=this.panier.getProduct();

   /* const index = this.products.findIndex((x: any) => x.id === id);
    this.qty=this.products[index].quantity;
    const prix=this.products[index].prix;
    this.name=this.products[index].nom;
  
   

    
    console.log(this.products[index].page.id);
    console.log(this.products[index].page.title);
    this.vendorId=this.products[index].page.id;
    this.vendorT=this.products[index].page.title;
    this.vendorE=this.products[index].page.email;*/

      this.Total=this.total();

      this.somme=this.total()+10;

     //add divice pour get notification
    
      this.not.addDivce(this.DeviceDto).subscribe(d=>{
        console.log("device"+"add device  successfly")
      }


      );

      //get token from firebase 
      /*this.msg.requestToken.subscribe(token => {
    
        console.log(token);})
        */
        

  
        //notification from firebase
  this.msg.requestToken.subscribe(token => {
    
    console.log(token);})
  
  
          
          this.msg.messages.subscribe(
          (payload) => {
          console.log("new message received. ", payload);
          
          })

          

}


getUser(email:any){
this.userServ.getUserByemail(email)
.subscribe({
  next: (data) => {
    this.user = data;  
     console.log(this.user.firstName);
  },
  error: (e) => console.error(e)
});
console.log(this.user.firstName);
}
get total() {
  return this.products?.reduce(
    (sum, product) => ({
      quantity: 1,
      prix: sum.prix + product.quantity * product.prix,
    }),
    { quantity: 1, prix: 0 }
  ).prix;
}
//charger les donner de commande
modif(){
  this.Commande.idSender=this.user.id;
  this.Commande.phone=this.products[0].page.phone;
  this.Commande.totalPrice=this.total;
  this.Commande.articles=this.products;
  //this.Commande.idVendor=this.products[0].page.id;
  this.Commande.idVendor=this.products[0].page.id;
 
  console.log(this.Commande);
  


}
//confirmer commande 
Confirmer(){
  this.CommandeServ.AddCommade(this.Commande).subscribe(resp => {


        
    console.log('Commande ajoutée avec succès')
  });

}
//permession from firebase


}