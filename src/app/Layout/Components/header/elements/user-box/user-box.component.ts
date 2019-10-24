import {Component, OnInit} from '@angular/core';
import {ThemeOptions} from '../../../../../theme-options';
import { Router } from '@angular/router';
import { Commerce } from 'src/app/Models/Commerce';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/Services/user.service';
import { AuthenticationProvider } from 'src/app/Services/Firestore/authentication/authentication';
import { CommercesService } from 'src/app/Services/Firestore/commerces.service';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
})
export class UserBoxComponent implements OnInit {

  public commerceName:string;
  public commerceIcon:string;
  public commerceId:number;
  private commerceSubscription: Subscription;

  constructor(
    public globals: ThemeOptions,
    public router: Router,
    public _commerceService:CommercesService,
    public _userService:UserService,
    public auth:AuthenticationProvider
    ) {
      this.commerceName="";
      this.commerceIcon = "";
      this.commerceId = 0;
  }

  ngOnInit() {
   this.commerceSubscription =  this._commerceService.getSelectedCommerce().subscribe(data=>{
      console.log(data);   
      if(data)   {
        this.commerceName = data.name;
        this.commerceIcon = data.icon;
        this.commerceId = data.id;
      }  
      else{
        this.commerceName = undefined;
        this.commerceIcon = undefined;
        this.commerceId = undefined;
      }
      
    });
  }


  cerrarSesion(){    
    this._commerceService.setSelectedCommerce(0);
    this.auth.signOut();
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.commerceSubscription.unsubscribe();
  }
}
