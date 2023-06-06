import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserServiceService } from '../_services/user-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialogComponent } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { LivreurComponent } from '../livreur/livreur.component';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-riders',
  templateUrl: './riders.component.html',
  styleUrls: ['./riders.component.scss']
})
export class RidersComponent  implements OnInit, AfterViewInit {
  livreur!:any[];
  displayedColumns: string[] = ['id','firstName','lastName', 'email', 'phone', 'enLigne','sold','Action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  animal!: Number;
  name!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
 
  constructor(private user:UserServiceService,public dialog: MatDialog){}
 // dataSource = new MatTableDataSource<Observable<page2[]>>(this.vendors$);

  ngOnInit(): void {
    
    this.user.Livreurs().subscribe({
      next: (data) => {

        this.livreur= data;
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
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '700px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
modifier(i:string):void {
  const dialogRef = this.dialog.open(DialogComponent, {
    data: {id:i, animal: this.animal},
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.animal = result;
  });
}
bloquer(id:string){
  this.user.bloquer(id).subscribe();

}
}