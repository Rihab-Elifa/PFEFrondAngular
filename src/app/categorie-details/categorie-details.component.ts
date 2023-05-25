import { Component, Input, OnInit } from '@angular/core';
import { Categorie } from '../Models/Categorie';
import { CategorieService } from '../_services/categorie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categorie-details',
  templateUrl: './categorie-details.component.html',
  styleUrls: ['./categorie-details.component.scss']
})
export class CategorieDetailsComponent implements OnInit {
  @Input() viewMode =false;

  @Input() currentT:Categorie={
    id: '',
    name: ''
  };
  message='';
  constructor(private catS:CategorieService,private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {
    if(!this.viewMode){
      this.message='';
     
    }
  }
 
  updateTutorial():void{
    this.message='';
    this.catS.update(this.currentT.id,this.currentT)
    .subscribe({
      next:(res)=>{
        console.log(res);
        this.message=res.message ? res.message : 'this categorie was updated successfully!';
      },
      error:(e)=>console.error(e)
    });
  }
  deleteTutorial():void{
    this.catS.delete().subscribe({
      next:(res)=>{
        console.log(res);
        this.router.navigate(['/list-category']);
      },
      error:(e)=>console.error(e)
    });
  }

}
