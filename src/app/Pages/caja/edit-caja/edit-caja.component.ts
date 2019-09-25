import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-caja',
  templateUrl: './edit-caja.component.html',
  styleUrls: ['./edit-caja.component.sass']
})
export class EditCajaComponent implements OnInit {

  registerFormCaja: FormGroup;
  closeResult: string;
  heading;
  subheading;
  icon;
  submitted: boolean;


  constructor( private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {

    }

  ngOnInit() {

    this.registerFormCaja = this.formBuilder.group({
      name:[this.route.snapshot.params.name, Validators.required],
      total:[this.route.snapshot.params.total,Validators.required],
    });

    if(this.route.snapshot.params.id != undefined){
     
      this.heading = 'Actualizar Caja';
      this.subheading = 'Modificar campos para actualizar la caja.';
      this.icon = 'pe-7s-phone icon-gradient bg-premium-dark'
    }else{

      this.heading = 'Nueva Caja';
      this.subheading = 'Rellenar todos los campos del formulario de la nueva caja.';
      this.icon = 'pe-7s-phone icon-gradient bg-premium-dark';
    }
  }

  get caja(){
    return this.registerFormCaja.controls;
  }

  Guardar(){

    this.submitted = true;

    if (this.registerFormCaja.invalid) {
      return;
    }
  }

  Cancelar(){
    
  }

}
