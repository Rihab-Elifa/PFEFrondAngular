import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommandeService } from '../_services/commande.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, AfterViewInit {
  c!:any[];
  displayedColumns: string[] = ['id', 'date', 'status', 'client','vendeur','livreur'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
 
  constructor(private commande:CommandeService){}
 // dataSource = new MatTableDataSource<Observable<page2[]>>(this.vendors$);

  ngOnInit(): void {
    
    this.commande.getAll().subscribe({
      next: (data) => {

        this.c= data;
        console.log(data);
        this.dataSource.data = data;
       
      
      },
      error: (e) => console.error(e)
    });
 
   

  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
