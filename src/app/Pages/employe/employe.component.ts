import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommercesService } from 'src/app/Services/commerces.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.sass']
})
export class EmployeComponent implements OnInit {
  
  heading = 'Empleados';
  subheading = 'Listado de todos los empleados del comercio.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
  buttons = [{
    href:"/empleado/guardar",
    icon:"plus",
    title:"Agregar Empleado"
  }]

  public commerce:any;
  private commerceSubscription: Subscription;
  
  constructor(
    private modalService: NgbModal,
    public _commerceService:CommercesService,
    public router: Router,
  ) {
  
    this.commerce = "";
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

  ngOnInit() {
  }

}
