import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { page } from '../Models/page';
import { VendorServicesService } from '../_services/vendor-services.service';
import { activityy } from '../Models/activityy';
import { Region } from '../Models/Region';

@Component({
  selector: 'app-vendre',
  templateUrl: './vendre.component.html',
  styleUrls: ['./vendre.component.scss']
})
export class VendreComponent {
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

 constructor(private vendorServ:VendorServicesService){}

  ajouterVente(): void {
    this.vendorServ.ajouterPage(this.id, this.page, this.imageProfile, this.imageCouverture)
      .subscribe(resp => {
        
        console.log('Page de vente ajoutée avec succès')
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


}