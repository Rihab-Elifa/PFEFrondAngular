import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthService } from '../_services/auth.service';
import { LivreurDto } from '../Models/LivreurDto';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { DialogOverviewExampleDialogComponent } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';

@Component({
  selector: 'app-livreur',
  templateUrl: './livreur.component.html',
  styleUrls: ['./livreur.component.scss']
})
export class LivreurComponent {
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

constructor(private auth:AuthService){}


  onSubmit(){
    
    this.auth.registerLivreur(this.user).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
   
  
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSuccessful = true;
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

