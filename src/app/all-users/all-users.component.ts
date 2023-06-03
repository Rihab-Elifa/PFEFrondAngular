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
  users!:user2[];
  displayedColumns: string[] = ['id', 'firsName', 'LastName', 'email','role','phone'];
  dataSource: MatTableDataSource<user2> = new MatTableDataSource<user2>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  constructor(private user:UserServiceService){}
 // dataSource = new MatTableDataSource<Observable<page2[]>>(this.vendors$);

  ngOnInit(): void {
    
    this.user.getUser().subscribe(data=>{
      this.users=data;
      this.dataSource.data = data;
    }
      )
 
   

   
    }

 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
