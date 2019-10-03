import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommercesService } from 'src/app/Services/commerces.service';
import { Router } from '@angular/router';
import { viewAttached } from '@angular/core/src/render3/instructions';
import { ServicesService } from 'src/app/Services/services.service';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/Services/categoryes.service';

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

  serviceValue;
  closeResult: string;
  
  public categoryes:any;
  private categoryesSubscription: Subscription;

  constructor(
    public _servicesService:ServicesService,
    private modalService: NgbModal,
    public router: Router,
    private toastr: ToastrService,
    private _categoriesService:CategoriesService
  ) {  
    this.services = "";
    this.categoryes = [];
  }


  ngOnDestroy() {
    this.commerceSubscription.unsubscribe();
  }

  ngOnInit() {
    this.obtenerServicios();
  }
  
  obtenerServicios(){
    this.commerceSubscription =  this._servicesService.get().subscribe(data=>{
      this.services = data;
      console.log(this.services);      
    });

    this.categoryesSubscription =  this._categoriesService.get().subscribe(data=>{
      this.categoryes = data;
      console.log(this.categoryes);     
    });
  }
  


  UpdateService(_service){

   

    
  }

  deleteService(content,service,$event){
    $event.stopPropagation();

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){
        this._servicesService.delete(service).subscribe(
          response=>{
            this.toastr.info(service.name+' ha sido borrado!','Servicio Borrado', {
              timeOut: 5000,
            });
            this.obtenerServicios();
          }
        )
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public updateTable(){
    this.serviceValue="";
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
