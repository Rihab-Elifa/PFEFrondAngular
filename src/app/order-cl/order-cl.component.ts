import { AfterViewInit, Component ,OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommandeService } from '../_services/commande.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-cl',
  templateUrl: './order-cl.component.html',
  styleUrls: ['./order-cl.component.scss']
})
export class OrderClComponent  implements OnInit, AfterViewInit {
  notif:any[]=[];
  c!:any[];
  displayedColumns: string[] = ['id', 'date', 'status', 'client','Action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
 
  constructor(private commande:CommandeService,private route:ActivatedRoute){}
 // dataSource = new MatTableDataSource<Observable<page2[]>>(this.vendors$);

  ngOnInit(): void {
       let id=this.route.snapshot.paramMap.get('id');
    console.log(id);
    
    this.commande.getvendeurC(id).subscribe({
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
  cancel(id:string){
    this.commande.ConcelCByV(id).subscribe({
      next: (data) => {

        this.c= data;
        console.log(data);
        this.dataSource.data = data;
       
      
      },
      error: (e) => console.error(e)
    });
 

  }
  Accept(id:string){
    this.commande.AcceptCByV(id).subscribe({
      next: (data) => {

        this.c= data;
        console.log(data);
        this.dataSource.data = data;
       
      
      },
      error: (e) => console.error(e)
    });
 

  }
}
