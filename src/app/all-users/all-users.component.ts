import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserServiceService } from '../_services/user-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { user2 } from '../Models/user2';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit, AfterViewInit {
  users:  any[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','role','phone'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  constructor(private user:UserServiceService){}
 // dataSource = new MatTableDataSource<Observable<page2[]>>(this.vendors$);

  ngOnInit(): void {
    
    this.user.Client().subscribe({
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


}
