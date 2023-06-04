import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../_services/auth.service';
import { LivreurDto } from '../Models/LivreurDto';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './dialog-overview-example-dialog.component.html',
  styleUrls: ['./dialog-overview-example-dialog.component.scss']
})
export class DialogOverviewExampleDialogComponent {
  isSuccessful=false;
  user:LivreurDto={
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    sold: ''
  };
  errorMessage!: string;
  message='';
  hide = true;
  animal!: string;
  name!: string;
  
  constructor(private auth:AuthService , public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  
    onSubmit(){
      
      this.auth.registerLivreur(this.user).subscribe({
        next: data => {
          console.log(data);
          this.isSuccessful = true;
     
    
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSuccessful = false;
        }
      });
    }
   /*openDialog(): void {
      const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
        data: {name: this.name, animal: this.animal},
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.animal = result;
      });
    }*/
    
  }
  
  
