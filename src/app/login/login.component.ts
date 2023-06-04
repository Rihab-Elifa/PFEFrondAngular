import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { user } from '../Models/user';
import { Router } from '@angular/router';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles!: string;
  email!:string;

  constructor(private authService: AuthService,private route:Router,private msg: AngularFireMessaging) { }

  ngOnInit(): void {
   
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: data => {

        const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
        const email = currentUser.email;
        const role=currentUser.role;
        // retrieve other data as needed
        // Vérifier si le rôle est administrateur
        if (role.includes('ROLE_ADMIN')) {
        // Rediriger vers la page admin
        this.route.navigate(['sidebar']);
        } else {
          this.route.navigate(['profile']);
        }
       
  
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        //notification from firebase
       this.msg.requestToken.subscribe(token => {
    
     console.log(token);})
  
  
        
        
      
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

 
}
