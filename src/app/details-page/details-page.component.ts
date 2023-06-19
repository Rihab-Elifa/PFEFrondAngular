import { Component, OnInit } from '@angular/core';
import { VendorServicesService } from '../_services/vendor-services.service';
import { page2 } from '../Models/page2';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../Models/Article';
import { AuthService } from '../_services/auth.service';
import { UserServiceService } from '../_services/user-service.service';
import { Chart, registerables } from 'chart.js'
import { CommandeService } from '../_services/commande.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent implements OnInit {
  showFiller = false;
 
  article?:Article[];
  page2!:page2;
  image!:File;
  b=false;
  revenue!:any;
rev:any[]=[];
date:any[]=[];
formattedDates!:any;
revenue2!:any;
rev2:any[]=[];
date2:any[]=[];
formattedDates2!:any;
notif:any[]=[];
totalSales:any;
todaySales:any;
todayRevenueV:any;
totalRV:any;

  constructor(private vendorServ:VendorServicesService,private route:ActivatedRoute,private auth:AuthService,private userServ:UserServiceService,private commande:CommandeService){}
  ngOnInit(): void {
    let id=this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.vendorServ.getPage(id).subscribe({
      next: (data) => {
       this.page2=data;
       console.log(data);

      },
      error: (e) => console.error(e)
    });
    this.vendorServ.getAllArticleByPage(id).subscribe({
      next: (data) => {
       this.article=data;
       console.log(data);

      },
      error: (e) => console.error(e)
    });
   
    //get weekrevenue
    this.userServ.weekRevenue('647860060826046450069a35')
    .subscribe({
      next: (data) => {
        this.revenue=data;
        console.log(data);
        this.rev=Array.from({ length: data.length }, (_, i) => data[i].revenue);
        console.log(this.rev); // [10000, 6000, 10000]
        
        this.date=Array.from({ length: data.length }, (_, i) => data[i].date);
        console.log(this.date); 
        
      // Formater les dates au format 'DD/MM'
 this.formattedDates = this.date.map(date => {
  const [year, month, day] = date.split('-');
  return `${day}/${month}`;
});
       
    this.renderChart(this.date,this.rev,'bar','barchart');
    this.renderChart(this.date,this.rev,'pie','piechart');
   
      },
      error: (e) => console.error(e)
    });
//month revenue
this.userServ.monthRevenue('647860060826046450069a35')
.subscribe({
  next: (data) => {
    this.revenue2=data;
    console.log(data);
    this.rev2=Array.from({ length: data.length }, (_, i) => data[i].revenue);
    console.log(this.rev2); // [10000, 6000, 10000]
    
    this.date2=Array.from({ length: data.length }, (_, i) => data[i].date);
    console.log(this.date2); 
    
  // Formater les dates au format 'DD/MM'
this.formattedDates2 = this.date2.map(date2 => {
const [year, month, day] = date2.split('-');
return `${day}/${month}`;
});
   
this.renderChart(this.date2,this.rev2,'bar','barchart2');
this.renderChart(this.date2,this.rev2,'pie','piechart2');

  },
  error: (e) => console.error(e)
});

 //get all notification 
 this.commande.getAllNotification().subscribe({
  next: (data) => {
    this.notif= data;
    console.log(  'notification', this.notif);
  },
  error: (e) => console.error(e)
});
//total sales
this.userServ.VSTotat(id)
.subscribe({
  next: (data) => {
    this.totalSales=data;
    console.log(data);
  },
  error: (e) => console.error(e)
});
//today sales
this.userServ.SalsT(id)
.subscribe({
  next: (data) => {
    this.todaySales=data;
    console.log(data);
  },
  error: (e) => console.error(e)
});
//today revenue
this.userServ.VendeurReToday(id)
.subscribe({
  next: (data) => {
    this.todayRevenueV=data;
    console.log(data);
  },
  error: (e) => console.error(e)
});
//total revenue
this.userServ.VendeurReT(id)
.subscribe({
  next: (data) => {
    this.totalRV=data;
    console.log(data);
  },
  error: (e) => console.error(e)
});
  
  
  } 
  onProfilImageSelected(event: any): void {
    this.image= event.target.files[0];
  }

  click(){
  this.b=true;
  }
 //Edit photo profile 
  changePhoto(id:string):void{
    this.vendorServ.editPagephoto(id,this.image).subscribe({
      next: (data) => {
        console.log("image update successful");
        
 
       },
       error: (e) => console.error(e)

    })

   }
   supprimer(id:string):void{
    this.vendorServ.deleteArticle(id).subscribe(() => {
      // code à exécuter après la suppression de la page
    });}
    logout():void{
      this.auth.clearToken();
    
    
    }
    //chart
    renderChart(date:any[],rev:any[],type:any,id:any){
      console.log("date",date)
      console.log("rev",rev)
      const myChart = new Chart(id, {
        type: type,
        data: {
          labels:date,
          datasets: [{
            label: '# of Votes',
           data:  rev,
    
           backgroundColor: [
            ' #FFE6C7',
            ' #FF6000',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
  //how get detail page image +data angular 15?

 


