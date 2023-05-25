import { Component } from '@angular/core';
import { Categorie } from '../Models/Categorie';
import { CategorieService } from '../_services/categorie.service';

@Component({
  selector: 'app-add-cat',
  templateUrl: './add-cat.component.html',
  styleUrls: ['./add-cat.component.scss']
})
export class AddCatComponent {
  categorie:Categorie={
    id: '',
    name: ''
  };
  submitted=false;
  constructor(private catservice:CategorieService){}
  saveTutorial(): void {
    const data = {
      name: this.categorie.name
    };

    this.catservice.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }
  newTutorial(): void {
    this.submitted = false;
    this.categorie = {
      id:'',
      name: ''
      
    };
  }
}
