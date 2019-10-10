import { Component, OnInit } from '@angular/core';
import { Provider } from 'src/app/Models/Provider';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';
import { ProvidersService } from 'src/app/Services/Firestore/providers.service';

@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.sass']
})
export class EditProviderComponent implements OnInit {

  public provider:Provider;
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
    public _providersService:ProvidersService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { 
    this.provider = new Provider();    
  }

  ngOnInit() {

   

    this.registerForm = this.formBuilder.group({
      name: [this.route.snapshot.params.name, Validators.required],
      address: [this.route.snapshot.params.address],
      phone_number: [this.route.snapshot.params.phone_number],
      email: [this.route.snapshot.params.email],
      description: [this.route.snapshot.params.description],
    });

    
    if(this.route.snapshot.params.id){
      let editSubscribe =  this._providersService.get(this.route.snapshot.params.id).subscribe((client:any) => {
        
        this.isUpdate = true;
        this.heading ="Editar Proveedor";
        
        this.registerForm.setValue({
          name: client.payload.data().name,
          address: client.payload.data().address,
          phone_number: client.payload.data().phone_number,
          email: client.payload.data().email,
          description: client.payload.data().description
        });
        editSubscribe.unsubscribe();
      });
    }
    else{
      this.isUpdate = false;
      this.heading = "Nuevo Proveedor";
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

    this.provider.id = this.route.snapshot.params.id;
    this.provider.name = this.registerForm.controls.name.value;
    this.provider.address = this.registerForm.controls.address.value;
    this.provider.phone_number = this.registerForm.controls.phone_number.value;
    this.provider.email = this.registerForm.controls.email.value;
    this.provider.description = this.registerForm.controls.description.value;
   
    if(this.isUpdate){
      //Update
      console.log(this.provider);
      this.toastr.success(this.provider.name+' ha sido actualizado!','Proveedor Actualizado', {
        timeOut: 5000,
      });    

      this._providersService.update(this.provider.id.toString(), this.provider).then(() => {        
            
      }, (error) => {
        console.log(error);
      });
      this._location.back();
      
    }
    else{

      this.toastr.success(this.provider.name+' ha sido creado!','Proveedor Creado', {
        timeOut: 5000,
      });
      this._providersService.create(this.provider).then(() => {
        
      }, (error) => {
        console.error(error);        
      });  
      this._location.back();
    }
  }

}

