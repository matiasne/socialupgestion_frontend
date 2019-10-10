import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { viewAttached } from '@angular/core/src/render3/instructions';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/Services/Firestore/categories.service';
import { ServicesService } from 'src/app/Services/Firestore/services.service';

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
  public commerce:any;
  private commerceSubscription: Subscription;

  serviceValue;
  closeResult: string;
  
  public categories:any;
  private categoryesSubscription: Subscription;

  private serviceSubscription:Subscription;

  constructor(
    private modalService: NgbModal,
    public router: Router,
    private toastr: ToastrService,
    private _categoriesService:CategoriesService,
    private _servicesService:ServicesService
  ) {  
    this.services = "";
    this.categories = [];
  }


  ngOnDestroy() {
    if(this.serviceSubscription)
      this.serviceSubscription.unsubscribe();

    if(this.categoryesSubscription)
      this.categoryesSubscription.unsubscribe();
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


    this.categoryesSubscription = this._categoriesService.getAll().subscribe((categoriesSnapshot) => {
      this.categories = [];
      categoriesSnapshot.forEach((categorieData: any) => {
        this.categories.push(categorieData.payload.doc.data());
        this.categories[this.categories.length - 1].id = categorieData.payload.doc.id;        
      });
      console.log(this.categories);
    });

    
  }
  
  
  deleteService(content,service,$event){
    $event.stopPropagation();

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){
        this._servicesService.delete(service.id);
        this.toastr.info(service.name+' ha sido borrado!','Servicio Borrado', {
          timeOut: 5000,
        });
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
