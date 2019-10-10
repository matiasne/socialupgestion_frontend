import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/Models/Client';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/Services/Firestore/clients.service';
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.sass']
})
export class EditClientComponent implements OnInit {

  public client:Client;
  public categoryes:any;
  private categoryesSubscription: Subscription;
  public isUpdate:boolean;
  registerForm: FormGroup;
  submitted = false;
  heading;
  subheading = '';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
 

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private _location: Location,
    public _clientsService:ClientsService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { 
    this.client = new Client();    
    this.categoryes = [];
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

    if(this.route.snapshot.params.id){
      let editSubscribe =  this._clientsService.get(this.route.snapshot.params.id).subscribe((client:any) => {
        
        this.isUpdate = true;
        this.heading ="Editar Cliente";
        
        this.registerForm.setValue({
          name: client.payload.data().name,
          address: client.payload.data().address,
          phone_number: client.payload.data().phone_number,
          email: client.payload.data().email,
          description: client.payload.data().description,
          img: client.payload.data().img
        });
        editSubscribe.unsubscribe();
      });
    }
    else{
      this.isUpdate = false;
      this.heading = "Nuevo Cliente";
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

    this.client.id = this.route.snapshot.params.id;
    this.client.name = this.registerForm.controls.name.value;
    this.client.img = this.registerForm.controls.img.value;
    this.client.address = this.registerForm.controls.address.value;
    this.client.phone_number = this.registerForm.controls.phone_number.value;
    this.client.email = this.registerForm.controls.email.value;
    this.client.description = this.registerForm.controls.description.value;
   
    if(this.isUpdate){
      //Update
      console.log(this.client);
      this.toastr.success(this.client.name+' ha sido actualizado!','Cliente Actualizado', {
        timeOut: 5000,
      });    

      this._clientsService.update(this.client.id.toString(), this.client).then(() => {        
            
      }, (error) => {
        console.log(error);
      });
      this._location.back();
      
    }
    else{

      this.toastr.success(this.client.name+' ha sido creado!','Cliente Creado', {
        timeOut: 5000,
      });
      this._clientsService.create(this.client).then(() => {
        
      }, (error) => {
        console.error(error);        
      });  
      this._location.back();
    }
  }

}
