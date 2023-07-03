import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserServiceService } from '../_services/user-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogOverviewExampleDialogComponent } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { RegisterSAdminComponent } from '../register-sadmin/register-sadmin.component';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit, AfterViewInit {
  users:  any[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','role','phone','caisse','reset'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  name: any;
  animal: any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  constructor(private user:UserServiceService,public dialog: MatDialog){}
 // dataSource = new MatTableDataSource<Observable<page2[]>>(this.vendors$);

  ngOnInit(): void {
    
    this.user.Admin().subscribe({
      next: (data) => {
        this.users=data;
        console.log('data',data);
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
  openDialog(){
    let dialogRef = this.dialog.open(RegisterSAdminComponent, {
      width: '700px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
    
  }
  reset(id:string){
    this.user.Reset(id).subscribe({
      next: (data) => {
        console.log(data);

      },
      error: (e) => console.error(e)
    });
  }

}
