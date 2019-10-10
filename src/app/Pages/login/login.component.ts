import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { AuthenticationProvider } from 'src/app/Services/Firestore/authentication/authentication';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public email:string;
  public password:string;

  constructor(
    private _userService:UserService,
    public router: Router,
    private auth:AuthenticationProvider,
    private toastr: ToastrService,
  ) {
    this.email ="";
    this.password ="";
   }

  ngOnInit() {
    if(this.auth.isLoggedIn){
      this.router.navigate(['/home']);
    }
  }

  

  login(){

   
    
		this.auth.login(this.email.trim(),this.password.trim());		
      
    
  }

  
  loginWithGoogle() {
    if(this.auth.googleSignin()){
      
    }

  }

  reiciarPassword(){
    this.router.navigate(['/reset']);
  }
  
  signup(){
    this.router.navigate(['/signup']);
  }
}
