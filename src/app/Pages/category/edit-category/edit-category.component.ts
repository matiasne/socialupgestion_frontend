import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/Services/clients.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.sass']
})
export class EditCategoryComponent implements OnInit {

  registerFormCategory: FormGroup;
  heading;
  subheading;
  icon;
  submitted: boolean;

  constructor(private route: ActivatedRoute,
    public router: Router,
    public _clientsService:ClientsService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit() {

    this.registerFormCategory = this.formBuilder.group({
      name:[this.route.snapshot.params.name, Validators.required]
    });

    if(this.route.snapshot.params.id == undefined){
      this.heading = 'Actualizar Categoria';
      this.subheading = 'Modificar campos para actualizar la cagetoria.';
      this.icon = 'pe-7s-phone icon-gradient bg-premium-dark';
    }
    else{
      this.heading = 'Agregar Categoria';
      this.subheading = 'Completar los campos para crear la nueva categoria.';
      this.icon = 'pe-7s-phone icon-gradient bg-premium-dark';
    }

  }

  get cat(){
    return this.registerFormCategory.controls;
  }

  Guardar(){

    this.submitted = true;

    if (this.registerFormCategory.invalid) {
      return;
    }
  }
  
}
