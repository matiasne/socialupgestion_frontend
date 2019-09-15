import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { ServicesService } from 'src/app/Services/services.service';
import { Service } from 'src/app/Models/Service';
import { CategoryesService } from 'src/app/Services/categoryes.service';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/Models/Category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.sass']
})
export class EditServiceComponent implements OnInit {

  public service:Service;
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
    public _categoryesService:CategoryesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { 
    this.service = new Service();    
    this.categoryes = [];
  }

  ngOnInit() {

   

    this.registerForm = this.formBuilder.group({
      name: [this.route.snapshot.params.name, Validators.required],
      description: [this.route.snapshot.params.description],
      category_id: [this.route.snapshot.params.category_id],
      price: [this.route.snapshot.params.price, [Validators.required]],
    });

    

    this.categoryesSubscription =  this._categoryesService.getCategoryes<Category>().subscribe(data=>{
      this.categoryes = data;
      console.log(this.categoryes);
     
    });

  
    if(this.route.snapshot.params.id == undefined){
      this.isUpdate = false;
      this.heading = "Nuevo Servicio";
    }
    else{
      this.isUpdate = true;
      this.heading ="Editar Servicio";
    }

    
  }

  
  ngOnDestroy() {
    this.categoryesSubscription.unsubscribe();
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
      this._servicesService.updateService(this.service).subscribe(
        response=>{
          console.log(response);

          this.toastr.success(this.service.name+' ha sido actualizado!','Actualizado', {
            timeOut: 5000,
          });

          this._location.back();
        }
      )
    }
    else{
      this._servicesService.addService(this.service).subscribe(
        response=>{
          console.log(response);
          this.toastr.success(this.service.name+' ha sido creado!','Creado', {
            timeOut: 5000,
          });
          this._location.back();
        }
      )
     
    }
  }

}
