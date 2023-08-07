import { Component, Inject, OnInit } from '@angular/core';
import { CommandeService } from '../_services/commande.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-detail-commande',
  templateUrl: './detail-commande.component.html',
  styleUrls: ['./detail-commande.component.scss']
})
export class DetailCommandeComponent implements OnInit  {
  cmd:any;
  ArticleComd:any[]=[];

  constructor(private commande:CommandeService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  ngOnInit() {
    this.commande.getCommandeById(this.data.id).subscribe({
      next: (data) => {
        this.cmd = data;
        console.log('detail du commande ', this.cmd);
        this.ArticleComd = this.cmd.articles; // Assuming 'articles' is the property in the cmd object that holds the list of articles
        // Handle the fetched data as needed
      },
      error: (e) => console.error(e)
    });
    

  }

 
  onNoClick(): void {
    this.dialogRef.close();
  }
}
