import { Component, OnInit } from '@angular/core';
import { CommercesService } from 'src/app/Services/commerces.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.sass']
})
export class ServiceComponent implements OnInit {

  heading = 'Servicios';
  subheading = 'Listado de todos los servicios del comercio.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
  buttons = [{
    href:"/servicio/guardar",
    icon:"plus",
    title:"Agregar Servicio"
  }]

  public commerce:any;
  commerceSubscription: Subscription;

  constructor(
    private _commerceService:CommercesService,
    public router: Router
  ) { }

  ngOnInit() {
    this.commerceSubscription =  this._commerceService.getSelectedCommerce().subscribe(data=>{
      this.commerce = data;
      console.log(this.commerce);

      if(this.commerce == "0"){
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnDestroy() {
    this.commerceSubscription.unsubscribe();
  }

}
