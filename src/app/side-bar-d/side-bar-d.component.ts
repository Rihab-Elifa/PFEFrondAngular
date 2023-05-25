import { Component, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ChartOptions, ChartType} from 'chart.js';
import {  BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js'
import { VendorServicesService } from '../_services/vendor-services.service';
import { UserServiceService } from '../_services/user-service.service';
import { user } from '../Models/user';
import { RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { Router } from '@angular/router';
Chart.register(...registerables);
@Component({
  selector: 'app-side-bar-d',
  templateUrl: './side-bar-d.component.html',
  styleUrls: ['./side-bar-d.component.scss'],
  standalone: true,
  imports: [MatSidenavModule,MatCardModule,MatListModule,CommonModule],


})

export class SideBarDComponent implements OnInit  {
  showFiller = false;
  listPages:any[]=[];
  
  constructor(private vendor:VendorServicesService,private router:Router,private user:UserServiceService) { }
  
  public type: ChartType = 'bar';

  public labels=['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

  public datasets = [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],

      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }];

  public options: ChartOptions = {
    scales: {
     
    }
  };


  ngOnInit() {
  
    
    this.vendor.getAllPages()
    .subscribe({
      next: (data) => {
        this.listPages=data;
        console.log(data);
     
       
      },
      error: (e) => console.error(e)
    });
   
    
    
    
 

  }
renderChart(use:any,vendor:any,type:any,id:any){
  const myChart = new Chart(id, {
    type: type,
    data: {
      labels:use,
      datasets: [{
        label: '# of Votes',
        data: vendor,
        borderWidth: 1
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
detail(id:string){
  this.router.navigate([`detailP/${id}`]);

}

}

