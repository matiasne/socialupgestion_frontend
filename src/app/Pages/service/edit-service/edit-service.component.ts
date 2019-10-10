import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { Service } from 'src/app/Models/Service';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/Models/Category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServicesService } from 'src/app/Services/Firestore/services.service';
import { CommercesService } from 'src/app/Services/Firestore/commerces.service';
@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.sass']
})
export class EditServiceComponent implements OnInit {

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
 

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private _location: Location,
    public _servicesService:ServicesService,
    private _commerceService:CommercesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
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
      price: [this.route.snapshot.params.price, [Validators.required]],
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

    this.service.id = this.route.snapshot.params.id;
    this.service.name = this.registerForm.controls.name.value;
    this.service.description = this.registerForm.controls.description.value;
    this.service.category_id = this.registerForm.controls.category_id.value;
    this.service.price = this.registerForm.controls.price.value;
   
    if(this.isUpdate){
      //Update
      console.log(this.service);
      this.toastr.success(this.service.name+' ha sido actualizado!','Cliente Actualizado', {
        timeOut: 5000,
      });    

      this._servicesService.update(this.service.id.toString(), this.service).then(() => {        
            
      }, (error) => {
        console.log(error);
      });
      this._location.back();
      
    }
    else{

      this.toastr.success(this.service.name+' ha sido creado!','Cliente Creado', {
        timeOut: 5000,
      });
      this._servicesService.create(this.service).then(() => {
        
      }, (error) => {
        console.error(error);        
      });  
      this._location.back();
    }
  }

}
