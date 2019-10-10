import { Component, OnInit } from '@angular/core';
import { AuthenticationProvider } from 'src/app/Services/Firestore/authentication/authentication';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {

  email:string;

  constructor(
    private auth:AuthenticationProvider,
    public router: Router,
    private toastr: ToastrService,
  ) { 
    this.email ="";
  }

  ngOnInit() {
  }

  reiniciar(){
    if(this.email != ""){
      this.auth.resetPassword(this.email);
      
    }
    else{
      this.toastr.info('Ingrese un mail por favor','Error', {
        timeOut: 5000,
      });
      
    }
    
  }

}
