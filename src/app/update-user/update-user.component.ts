import { Component, Input, OnInit } from '@angular/core';
import { user } from '../Models/user';
import { UserServiceService } from '../_services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { from } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
 
  

 @Input() user:user={
   id: '',
   email: '',
   password: '',
   firstName: '',
   lastName: '',
   phone: null,
   ppg: []
 }
  errorMessage!: string;
  message='';
  
  //email control
  email = this.user.email;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  //password
  hide = true;
  constructor(private UserService: UserServiceService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    let id=this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.UserService.getUserById(id)
    .subscribe({
      next: (data) => {
        this.user= data;
        console.log(data);
        
   //this.user.id=id;
      },
      error: (e) => console.error(e)
    });
  
  }

  onSubmit():void{
   
    //const { id, email, password ,firstName,lastName,phone} = this.form;
    this.UserService.updateUser(this.user).subscribe(
      {
        next:(res)=>{
          console.log('User updated successfully:', res);
        },
        error:(e)=>console.error(e)
      }
      
    );
  }
}