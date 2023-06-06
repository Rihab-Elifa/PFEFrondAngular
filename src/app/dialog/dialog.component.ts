import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../dialog-overview-example-dialog/dialog-overview-example-dialog.component';
import { UserServiceService } from '../_services/user-service.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  constructor(private user:UserServiceService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  update(id:String,i:Number){
    this.user.setSold(id,i).subscribe();
  }

}
