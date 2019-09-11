import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { CommercesService } from 'src/app/Services/commerces.service';
import { Commerce } from 'src/app/Models/Commerce';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public commerces:any[];
  
  constructor(
    private _userService:UserService,
    private _commercesSerivce:CommercesService,
    public router: Router
  ) { }

  ngOnInit(
  ) {   
    
    this._userService.validate().subscribe(
      data=>{
        console.log(data);
        this.getCommerces();
      },
      error=>{
        console.log(error);
        if(error == "401"){
          this._userService.logout();
          this.router.navigate(['/']);
        }
      }
    )
  }

  getCommerces(){
    this._commercesSerivce.getUserCommerces().subscribe(
      (resp:any)=>{
        console.log(resp);
        this.commerces = resp;
      },
      error=>{
        alert(error);
        this._userService.logout();
        this.router.navigate(['/']);
      }
    )
  }

  selecionarComercio(commerce){
    this._commercesSerivce.setSelectedCommerce(commerce);
    localStorage.setItem('commerce',JSON.stringify(commerce));
    this.router.navigate(['/venta']);
  }

}
