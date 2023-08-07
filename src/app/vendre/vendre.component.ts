import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { page } from '../Models/page';
import { VendorServicesService } from '../_services/vendor-services.service';
import { activityy } from '../Models/activityy';
import { Region } from '../Models/Region';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { UserServiceService } from '../_services/user-service.service';

@Component({
  selector: 'app-vendre',
  templateUrl: './vendre.component.html',
  styleUrls: ['./vendre.component.scss']
})
export class VendreComponent implements OnInit{
  items!:any[];
  addItem(newItem: any) {
    this.items.push(newItem);
  }

  showlocation=false
  id!: string;
  listeAct= activityy
  listRegion= Region;
   
  listeAct2 = Object.values(activityy);
  activity:any
  show=false
  r='';
  user:any;
  @Input() page:page={
    id: '',
    title: '',
    address: '',
    email: '',
    phone: 0,
    activity: activityy[2],
    postalCode: 0,
    region: Region[3],
    longitude: 0,
    latitude: 0
  }
  imageProfile!: File;
  imageCouverture!: File;
 // horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
 constructor(private userServ:UserServiceService,private vendorServ:VendorServicesService,private _snackBar: MatSnackBar){}
  ngOnInit(): void {
   
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
      const email = currentUser.email;
    
    this.userServ.getUserByemail(email)
    .subscribe({
      next: (data) => {
        this.user = data;
        console.log(data);
        console.log(this.user.id);
        
    this.id=this.user.id;
  
      }
    });
  }

  ajouterVente(): void {
    this.vendorServ.ajouterPage(this.id, this.page, this.imageProfile, this.imageCouverture)
      .subscribe(resp => {
        
        console.log('Page de vente ajoutée avec succès')
       
        this.show=true;
      this.r=resp;
      });
  }
  onProfilImageSelected(event: any): void {
    this.imageProfile = event.target.files[0];
  }
  onCouvertureImageSelected(event: any): void {
    this.imageCouverture = event.target.files[0];
  }


changeActivity(){
  console.log(this.page.activity)
if(this.page.activity==="PATISSERIE"||this.
page.activity==="FOOD"||this.page.activity==="MAGAZINE")
{this.showlocation=true}else{
this.showlocation=false

}


}
consoleValues(){
  if (this.items!=null){
    console.log(this.items);
  
  }
}

showOutput(val:any){
  this.page.latitude=val.lat;
  this.page.longitude=val.lng;
  console.log("lang lat",val.lat)
 
}

openSnackBar() {
  this._snackBar.open('Success!', 'Fermer', {
   //horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
  });
}
}