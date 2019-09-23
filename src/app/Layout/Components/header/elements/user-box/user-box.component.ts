import {Component, OnInit} from '@angular/core';
import {ThemeOptions} from '../../../../../theme-options';
import { Router } from '@angular/router';
import { Commerce } from 'src/app/Models/Commerce';
import { CommercesService } from 'src/app/Services/commerces.service';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {

  public user:any;
  public commerceName:string;
  private commerceSubscription: Subscription;

  constructor(
    public globals: ThemeOptions,
    public router: Router,
    public _commerceService:CommercesService,
    public _userService:UserService
    ) {
      this.commerceName="";
      this.user="";
  }

  ngOnInit() {
   this.commerceSubscription =  this._commerceService.getSelectedCommerce().subscribe(data=>{
      this.commerceName = data.name;
    });

    this._userService.validate().subscribe(
      data=>{
        this.user= data;
      }
    );
  }

  cerrarSesion(){
    
    this._userService.logout();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.commerceSubscription.unsubscribe();
  }

}
