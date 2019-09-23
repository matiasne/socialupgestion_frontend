import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { CommercesService } from 'src/app/Services/commerces.service';
import { Commerce } from 'src/app/Models/Commerce';
import { ToastrService } from 'ngx-toastr';

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
    public router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(
  ) {   
    
    this._userService.validate().subscribe(
      data=>{
        
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
        this.commerces = resp;

        if(this.commerces.length == 0){
          this.toastr.error('Para comenzar debes crear tu primer comercio!','Crea un comercio', {
            timeOut: 5000,
          });
        }
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
    
    this.router.navigate(['/sales']);
  }

}
