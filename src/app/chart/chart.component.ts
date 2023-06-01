import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'
import { VendorServicesService } from '../_services/vendor-services.service';
import { UserServiceService } from '../_services/user-service.service';
import { user } from '../Models/user';
import { page2 } from '../Models/page2';
Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  
})
export class ChartComponent implements OnInit {
  showFiller = false;
  formattedDates!:any;
  constructor(private vendor:VendorServicesService,private user:UserServiceService) { }
   PageUser!:any[];
revenue!:any;
rev:any[]=[];
date:any[]=[];
   use:user[]=[];
   use2: user[] = [];
   nbre:any[]=[];
  ngOnInit() {
    this.user.weekRevenue('647860060826046450069a35')
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


    
   
    


   console.log("users",this.use2)
    
  console.log("ls pages de users",this.PageUser)


  }
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
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
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