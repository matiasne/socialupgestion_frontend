import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { viewAttached } from '@angular/core/src/render3/instructions';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/Services/Firestore/categories.service';
import { ServicesService } from 'src/app/Services/Firestore/services.service';
import { SaleAddServiceComponent } from 'src/app/Components/sale-add-service/sale-add-service.component';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.sass']
})
export class ServiceComponent implements OnInit {

  @ViewChild("saleAddService") saleAddService: SaleAddServiceComponent;

  public servicioSeleccionado:any;

  heading = 'Servicios';
  subheading = 'Listado de todos los servicios del comercio.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
  buttons = [{
    href:"/service",
    icon:"plus",
    title:"Agregar Servicio",
  }]

  public services:any; 
  private serviceSubscription:Subscription;

  constructor(
    public router: Router,
    private _servicesService:ServicesService
  ) {  
    this.services = "";
  }

  ngOnDestroy() {
    if(this.serviceSubscription)
      this.serviceSubscription.unsubscribe();
  }

  ngOnInit() {   
    this.serviceSubscription = this._servicesService.getAll().subscribe((serviceSnapshot) => {
      this.services = [];
      serviceSnapshot.forEach((serviceData: any) => {
        this.services.push(serviceData.payload.doc.data());
        this.services[this.services.length - 1].id = serviceData.payload.doc.id;        
      });
      console.log(this.services);
    });
  }

  selecionarServicio(service){
    this.servicioSeleccionado = service;
    this.saleAddService.openModal(service);    
  }
  



}
