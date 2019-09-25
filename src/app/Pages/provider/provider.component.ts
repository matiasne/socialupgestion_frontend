import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommercesService } from 'src/app/Services/commerces.service';
import { Router } from '@angular/router';
import { viewAttached } from '@angular/core/src/render3/instructions';
import { ToastrService } from 'ngx-toastr';
import { ProvidersService } from 'src/app/Services/providers.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.sass']
})
export class ProviderComponent implements OnInit {

  heading = 'Proveedores';
  subheading = 'Listado de todos los proveedores del comercio.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
  buttons = [{
    href:"/provider",
    icon:"plus",
    title:"Agregar Proveedor",
  }]

  public providers:any;
  private commerceSubscription: Subscription;
  
  constructor(
    public _providersService:ProvidersService,
    public router: Router,
    private toastr: ToastrService
  ) {  
    this.providers = "";
  }


  ngOnDestroy() {
    this.commerceSubscription.unsubscribe();
  }

  ngOnInit() {
    this.obtenerProveedores();
  }

  
  obtenerProveedores(){
    this.commerceSubscription =  this._providersService.get().subscribe(data=>{
      this.providers = data;
      console.log(this.providers);
      if(this.providers == "0"){
        this.router.navigate(['/home']);
      }
    });
  }
  


  UpdateService(provider){

   

    
  }

  deleteService(provider){
    this._providersService.delete(provider).subscribe(
      response=>{
        this.toastr.info(provider.name+' ha sido borrado!','Servicio Borrado', {
          timeOut: 5000,
        });
        this.obtenerProveedores();
      }
    )
  }
}

