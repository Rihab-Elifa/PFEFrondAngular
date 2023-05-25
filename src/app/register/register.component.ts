import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: any = {
    username: null,
    email: null,
    password: null,
    firstName:null,
    lastName:null,
    phone:null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  msg='';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { firstName,lastName,phone, email, password } = this.form;

    this.authService.register(firstName,lastName,phone, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.msg=data.message;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}



