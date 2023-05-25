import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<any>();
  addNewItem(value: any) {
    this.newItemEvent.emit(value);
  }
  markeur: any
  markers:any[]=[];
  constructor(){}
  ngOnInit(): void {

 
    navigator.geolocation.getCurrentPosition((position) => {
  
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
    
      };
      
      console.log(this.center.lat);
      console.log(this.center.lng);
      //sauvagrde position de user dans local storage
      //localStorage.setItem("Position", JSON.stringify({ lat: this.center.lat, lng: this.center.lng }));

    });
    
   
    this.markeur = new google.maps.Marker({
      position: this.center,
      title:"Hello World!"
  });
 console.log("markeur",this.markeur)
  // To add the marker to the map, call setMap();
 


  }


    
  
  
  
  display: any;
  center: google.maps.LatLngLiteral = {
      lat: 34.85639049362211,
      lng: 7.931431281249992
  };
  zoom = 6;
 


  /*------------------------------------------
  --------------------------------------------
  moveMap()
  --------------------------------------------
  -------------------------------------------- click */
  moveMap(event: google.maps.MapMouseEvent) {
   /**  if (event.latLng != null) this.center = (event.latLng.toJSON()); */  
   if (event.latLng != null ){
    let marker=  new google.maps.Marker({
      position: event.latLng,
      title:"Hello World!"
  });
  
  this.markers.push(marker)
  console.log(this.markers[0].position.toJSON());
  this.addNewItem(this.markers[0].position.toJSON());

  console.log('markers =',this.markers)
   }

  }

  /*------------------------------------------
  --------------------------------------------
  move()
  --------------------------------------------
  --------------------------------------------*/
  move(event: google.maps.MapMouseEvent) {
      if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  //recuper la position du user 

  
  
  
}

