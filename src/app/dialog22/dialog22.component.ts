import { Component, Inject , OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { UserServiceService } from '../_services/user-service.service';

@Component({
  selector: 'app-dialog22',
  templateUrl: './dialog22.component.html',
  styleUrls: ['./dialog22.component.scss']
})
export class Dialog22Component implements OnInit{
  u!:any;
  constructor(private user:UserServiceService,
    public dialogRef: MatDialogRef<Dialog22Component>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  ngOnInit() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
      const email = currentUser.email;
    
    this.user.getUserByemail(email)
    .subscribe({
      next: (data) => {
        this.u = data;
}})}

  onNoClick(): void {
    this.dialogRef.close();
  }
  update(id:String,i:Number){
    this.user.PagesAdminsolde(id,this.u.id,i).subscribe();
  }

}
