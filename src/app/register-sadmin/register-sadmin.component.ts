import { Component, Inject } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogOverviewExampleDialogComponent } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { SAdminDto } from '../Models/SAdminDto';

@Component({
  selector: 'app-register-sadmin',
  templateUrl: './register-sadmin.component.html',
  styleUrls: ['./register-sadmin.component.scss']
})
export class RegisterSAdminComponent {
  isSuccessful=false;
  user:SAdminDto={
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    ville: ''
  };
  errorMessage!: string;
  message='';
  hide = true;
  animal!: string;
  name!: string;
  
  constructor(private auth:AuthService , public dialogRef: MatDialogRef<RegisterSAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  
    onSubmit(){
      
      this.auth.SousAdminR(this.user).subscribe({
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

    
  }
  
  
