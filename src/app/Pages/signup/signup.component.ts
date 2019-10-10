import { Component, OnInit } from '@angular/core';
import { AuthenticationProvider } from 'src/app/Services/Firestore/authentication/authentication';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  public email:String;
  public contrasena:String;
  public contrasenaConfirm:String;

  constructor(
    private auth:AuthenticationProvider,    
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.email ="";
    this.contrasena ="";
    this.contrasenaConfirm ="";

  }

  signup(){

    if(this.email==""){
      this.toastr.info('Ingrese un mail','Error', {
        timeOut: 5000,
      });
      return false;
    }

    if(this.contrasena==""){
      this.toastr.info('Ingrese una contraseña','Error', {
        timeOut: 5000,
      });
      return false;
    }

    
    if(this.contrasena != this.contrasenaConfirm){
      this.toastr.info('Las contraseñas no coinciden','Error', {
        timeOut: 5000,
      });
      return false;
    } 
    this.auth.signup(this.email.trim(),this.contrasena.trim());    
  }
}
