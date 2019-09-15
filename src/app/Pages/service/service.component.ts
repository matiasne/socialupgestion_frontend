import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommercesService } from 'src/app/Services/commerces.service';
import { Router } from '@angular/router';
import { viewAttached } from '@angular/core/src/render3/instructions';
import { ServicesService } from 'src/app/Services/services.service';
import { ToastrService } from 'ngx-toastr';

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
    href:"/service",
    icon:"plus",
    title:"Agregar Servicio",
  }]

  public services:any;
  private commerceSubscription: Subscription;
  
  constructor(
    public _servicesService:ServicesService,
    public router: Router,
    private toastr: ToastrService
  ) {  
    this.services = "";
  }


  ngOnDestroy() {
    this.commerceSubscription.unsubscribe();
  }

  ngOnInit() {
    this.obtenerServicios();
  }

  
  obtenerServicios(){
    this.commerceSubscription =  this._servicesService.getServices().subscribe(data=>{
      this.services = data;
      console.log(this.services);
      if(this.services == "0"){
        this.router.navigate(['/home']);
      }
    });
  }
  


  UpdateService(_service){

   

    
  }

  deleteService(service){
    this._servicesService.deleteService(service).subscribe(
      response=>{
        this.toastr.info(service.name+' ha sido borrado!','Servicio Borrado', {
          timeOut: 5000,
        });
        this.obtenerServicios();
      }
    )
  }
}
