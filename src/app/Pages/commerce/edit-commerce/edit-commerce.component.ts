import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/Models/Client';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/Services/clients.service';
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';
import { Commerce } from 'src/app/Models/Commerce';
import { CommercesService } from 'src/app/Services/commerces.service';

@Component({
  selector: 'app-edit-commerce',
  templateUrl: './edit-commerce.component.html',
  styleUrls: ['./edit-commerce.component.sass']
})
export class EditCommerceComponent implements OnInit {

  public commerce:Commerce;
  public isUpdate:boolean;
  registerForm: FormGroup;
  submitted = false;

  heading = 'Comercio';
  subheading = '';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private _location: Location,
    public _commercesService:CommercesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { 
    this.commerce = new Commerce();    
  }

  ngOnInit() {  

    this.registerForm = this.formBuilder.group({
      name: [this.route.snapshot.params.name, Validators.required],
      address: [this.route.snapshot.params.address],
      phone_number: [this.route.snapshot.params.phone_number],
      email: [this.route.snapshot.params.email],
      description: [this.route.snapshot.params.description],
      img: [this.route.snapshot.params.img],
    });  

  
    if(this.route.snapshot.params.id == undefined){
      this.isUpdate = false;
      this.heading = "Nuevo Comercio";
    }
    else{
      this.isUpdate = true;
      this.heading ="Editar Comercio";
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

    this.commerce.id = this.route.snapshot.params.id;
    this.commerce.name = this.registerForm.controls.name.value;
    this.commerce.img = this.registerForm.controls.img.value;
    this.commerce.address = this.registerForm.controls.address.value;
    this.commerce.phone_number = this.registerForm.controls.phone_number.value;
    this.commerce.email = this.registerForm.controls.email.value;
    this.commerce.description = this.registerForm.controls.description.value;
   
    if(this.isUpdate){
      //Update
      console.log(this.commerce);
      this._commercesService.update(this.commerce).subscribe(
        response=>{
          console.log(response);

          this.toastr.success(this.commerce.name+' ha sido actualizado!','Comercio Actualizado', {
            timeOut: 5000,
          });
          this._location.back();
        }
      )
    }
    else{
      this._commercesService.add(this.commerce).subscribe(
        response=>{
          console.log(response);
          this.toastr.success(this.commerce.name+' ha sido creado!','Comercio Creado', {
            timeOut: 5000,
          });
          this._location.back();
        }
      )     
    }
  }


}


