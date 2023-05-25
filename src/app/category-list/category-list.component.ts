import { Component, OnInit } from '@angular/core';
import { Categorie } from '../Models/Categorie';
import { CategorieService } from '../_services/categorie.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit{
  categorie?:Categorie[];
  currentIndex = -1;
  title = '';
  constructor(private categoryService:CategorieService){

  }


  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials(): void {
    this.categoryService.getAll()
      .subscribe({
        next: (data) => {
          this.categorie= data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


}
