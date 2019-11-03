import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { Service } from 'src/app/Models/Service';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/Models/Category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from 'src/app/Services/Firestore/services.service';
import { CommercesService } from 'src/app/Services/Firestore/commerces.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageSelectComponent } from 'src/app/Components/image-select/image-select.component';
import { ServiceAddPlanComponent } from 'src/app/Components/service-add-plan/service-add-plan.component';
@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.sass']
})
export class EditServiceComponent implements OnInit {

  @ViewChild("iconSelect") iconSelect: ImageSelectComponent;
  @ViewChild("portadaSelect") portadaSelect: ImageSelectComponent;
  @ViewChild("addPlan") addPlan: ServiceAddPlanComponent;
  
  public service:Service;
  public commerce:any;
  public categoryes:any;
  private categoryesSubscription: Subscription;
  public isUpdate:boolean;
  registerForm: FormGroup;
  submitted = false;

  heading = 'Servicios';
  subheading = '';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
 
  
  closeResult: string;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private _location: Location,
    public _servicesService:ServicesService,
    private _commerceService:CommercesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,        
    private modalService: NgbModal, 
  ) { 
    this.service = new Service();   
    this._commerceService.getSelectedCommerce().subscribe(data =>{
      this.commerce = data;
    });
  }

  ngOnInit() {   

    this.registerForm = this.formBuilder.group({
      name: [this.route.snapshot.params.name, Validators.required],
      description: [this.route.snapshot.params.description],
      category_id: [this.route.snapshot.params.category_id],
      price: [this.route.snapshot.params.price],
    });   

    if(this.route.snapshot.params.id){
      let editSubscribe =  this._servicesService.get(this.route.snapshot.params.id).subscribe((service:any) => {
        
        this.isUpdate = true;
        this.heading ="Editar Servicio";
        
        this.registerForm.setValue({
          name: service.payload.data().name,
          price: service.payload.data().price,
          description: service.payload.data().description,
          category_id: service.payload.data().category_id
        });
        this.service.icon = service.payload.data().icon;
        this.service.portada = service.payload.data().portada;
        this.service.plans = service.payload.data().plans;
        editSubscribe.unsubscribe();
      });
    }
    else{
      this.isUpdate = false;
      this.heading = "Nuevo Servicio";
    }   
  }
  
  ngOnDestroy() {
    
  }

  openAddIcon() {
    // and use the reference from the component itself
    this.iconSelect.openModal(this.iconSelect.content);
  }

  openAddPortada(){
    this.portadaSelect.openModal(this.portadaSelect.content);
  }

  openAddPlan(){
    this.addPlan.openModal();
  }


  Cancelar(){
    this._location.back();
  }

  get f() { return this.registerForm.controls; }

  Guardar(){    

    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    if(this.service.plans.length == 0){
      this.toastr.error('Por favor Agrege un plan al servicio','Error al generar servicio', {
        timeOut: 5000,
      });  
      return;
    }

    this.service.id = this.route.snapshot.params.id;
    this.service.name = this.registerForm.controls.name.value;
    this.service.description = this.registerForm.controls.description.value;
    this.service.category_id = this.registerForm.controls.category_id.value;
   
    if(this.isUpdate){
      //Update
      console.log(this.service);
      this.toastr.success(this.service.name+' ha sido actualizado!','Servicio Actualizado', {
        timeOut: 5000,
      });    

      this._servicesService.update(this.service.id.toString(), this.service).then(() => {        
            
      }, (error) => {
        console.log(error);
      });
      this._location.back();      
    }
    else{

      this.toastr.info(this.service.name+' ha sido creado!','Servicio Creado', {
        timeOut: 5000,
      });
      this._servicesService.create(this.service).then(() => {
        
      }, (error) => {
        console.error(error);        
      });  
      this._location.back();
    }
  }

  deleteService(content){
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){     
        this.toastr.info(this.service.name+' ha sido borrado!','Servicio Borrado', {
          timeOut: 5000,
        }); 
        this.router.navigate(['/services']);
        this._servicesService.delete(this.route.snapshot.params.id).then(() => {
            
        }, (error) => {
          console.error(error);
        });      
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  public iconoImagen(imagen) {
    console.log(imagen);
    this.service.icon = imagen;
  }

  public portadaImagen(imagen) {
    console.log(imagen);
    this.service.portada = imagen;
  }

  public pushPlan(plan) {
    console.log(plan);
    this.service.addPlan(plan);
  }

  public borrarPlan(index){
    this.service.plans.splice(index,1);
  }


}
