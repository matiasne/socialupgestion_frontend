import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaydesksService } from 'src/app/Services/paydesks.service';
import {Location} from '@angular/common';
import { Paydesk } from 'src/app/Models/Paydesk';

@Component({
  selector: 'app-edit-caja',
  templateUrl: './edit-caja.component.html',
  styleUrls: ['./edit-caja.component.sass']
})
export class EditCajaComponent implements OnInit {

  public paydesk:Paydesk;
  registerFormCaja: FormGroup;
  closeResult: string;
  heading;
  subheading;
  icon;
  submitted: boolean;

  public isUpdate:boolean;
  registerForm: FormGroup;

  constructor( 
    private route: ActivatedRoute,
    public router: Router,
    private _location: Location,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _paydesksService:PaydesksService
  ) {
    this.paydesk = new Paydesk;
    }

    ngOnInit() {

      this.registerForm = this.formBuilder.group({
        name: [this.route.snapshot.params.name, Validators.required]
      });
  
      if(this.route.snapshot.params.id == undefined){
        this.isUpdate = false;
        this.heading = "Nueva Caja";
      }
      else{
        this.isUpdate = true;
        this.heading ="Editar Caja";
      }
  
    }
  
    get f() { return this.registerForm.controls; }   
  
    Cancelar(){
      this._location.back();
    }
  
    Guardar(){
      
  
      this.submitted = true;
  
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
  
      this.paydesk.id = this.route.snapshot.params.id;
      this.paydesk.name = this.registerForm.controls.name.value;
     
      if(this.isUpdate){
        //Update
        console.log(this.paydesk);
        this._paydesksService.update(this.paydesk).subscribe(
          response=>{
            console.log(response);
  
            this.toastr.success(this.paydesk.name+' ha sido actualizada!','Actualizado', {
              timeOut: 5000,
            });
  
            this._location.back();
          }
        )
      }
      else{
        this._paydesksService.add(this.paydesk).subscribe(
          response=>{
            console.log(response);
            this.toastr.success(this.paydesk.name+' ha sido creado!','Creado', {
              timeOut: 5000,
            });
            this._location.back();
          }
        )
       
      }
    }

}
