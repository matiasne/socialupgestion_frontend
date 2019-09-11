import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';

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
    public router: Router
  ) { }

  ngOnInit() {
    
  }

  login(){
    this._userService.login(this.email,this.password,false).subscribe(
      (data:any) => {
        localStorage.setItem('token',data.access_token);
        this.router.navigate(['/home']);
      },
      error=>{
        console.log(error);
        if(error == "401"){
          alert("Usuario o contraseña Invalido");
        }
      }
    )
  }

}
