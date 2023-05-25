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
  constructor(private vendor:VendorServicesService,private user:UserServiceService) { }
   PageUser!:any[];
   PageUser2:any[]=[];
   use:user[]=[];
   use2: user[] = [];
   nbre:any[]=[];
  ngOnInit() {
    this.user.getUser()
    .subscribe({
      next: (data) => {
        this.use=data;
        console.log(data);
        for(let i=0; i<data.length ;i++){
          this.use2.push(data[i].firstName);
        
          
         
  
        }
       
      },
      error: (e) => console.error(e)
    });
    
   
    
    
    for(let i=0; i<this.use.length ;i++){
      this.vendor.getAllP("643870dc41d56d566658d5af").subscribe({
        next: (page) => {
     
        this.PageUser.push(i++);
        console.log("length",Object.keys(page).length)
   

        console.log("page",page)
        this.PageUser2=page;
        }
      });

    }

    this.renderChart(this.use2,this.PageUser,'bar','barchart');
    this.renderChart(this.use2,this.PageUser,'pie','piechart');
   

   console.log("users",this.use2)
    
  console.log("ls pages de users",this.PageUser)
 
   console.log("les pages",this.PageUser2)

  }
renderChart(use:any,vendor:any,type:any,id:any){
  const myChart = new Chart(id, {
    type: type,
    data: {
      labels:use,
      datasets: [{
        label: '# of Votes',
       data: [12, 19, 3, 5],

      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      
      ],
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}
}