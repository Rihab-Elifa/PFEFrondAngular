import { Component, OnInit ,AfterViewInit, ViewChild} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ChartOptions, ChartType} from 'chart.js';
import {  BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js'
import { VendorServicesService } from '../_services/vendor-services.service';
import { UserServiceService } from '../_services/user-service.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { user } from '../Models/user';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { Router } from '@angular/router';
import { Activity } from 'pfe-frontend/src/app/Models/Activity';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ChartComponent } from '../chart/chart.component';
import{SidbardModule} from'../sidbard/sidbard.module';
import { AuthService } from '../_services/auth.service';
Chart.register(...registerables);
@Component({
  selector: 'app-side-bar-d',
  templateUrl: './side-bar-d.component.html',
  styleUrls: ['./side-bar-d.component.scss']

})

export class SideBarDComponent implements OnInit,AfterViewInit   {
  showFiller = false;
  listPages:any[]=[];
  activityy!:Activity;
  act2:any[]=[];
  list:any[]=[];
  totalSales:any;
  selectedMenuItem: string = 'dashboard';
  us!:any;
  constructor(private route:ActivatedRoute,private auth:AuthService ,private userServ:UserServiceService,private vendor:VendorServicesService,private router:Router,private user:UserServiceService,private routerM:RouterModule) { }
  
  public type: ChartType = 'bar';

  public labels=['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<livreur>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


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
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    const email = currentUser.email;
  
  this.userServ.getUserByemail(email)
  .subscribe({
    next: (data) => {
      this.us = data;
      console.log(this.us.id);
      
   
    },
    error: (e) => console.error(e)
  });



    //get sales
    this.user.TotaleSales()
    .subscribe({
      next: (data) => {
        this.totalSales=data;
        console.log(data);
     
       
      },
      error: (e) => console.error(e)
    });
  
    
    this.vendor.getAllPages()
    .subscribe({
      next: (data) => {
        this.listPages=data;
        console.log(data);
     
       
      },
      error: (e) => console.error(e)
    });
    const x=Activity.BEAUTE;
    for(let i in Activity){
           
      this.vendor.getAllPageByCat(Activity[i])
    .subscribe({
      next: (data) => {
        const a=data.length;
        if(a!==0){
          this.list.push(data.length);
          console.log(data);
          this.act2.push(i);
          console.log(i)
        }
   
      },
      error: (e) => console.error(e)
    });

    console.log('les pages par categorie',this.list);


    }
    
    console.log("les paramters",this.act2,this.list)
    
 this.renderChart(this.act2,this.list)

  }
renderChart(act2:any,list:any){
  const myChart = new Chart("barchart", {
    
      type: 'bar',
      data: {
        labels:[12, 19, 3, 5],
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
detail(id:string){
  this.router.navigate([`detailP/${id}`]);

}
logout():void{
  this.auth.clearToken();


}

}



export interface livreur {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: livreur[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];

