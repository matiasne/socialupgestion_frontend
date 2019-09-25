import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/Services/categoryes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import {Location} from '@angular/common';
import { Category } from 'src/app/Models/Category';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.sass']
})
export class EditCategoryComponent implements OnInit {

  public category:Category;
  public categories:any;
  private categoryesSubscription: Subscription;
  public isUpdate:boolean;
  registerForm: FormGroup;
  submitted = false;

  heading = 'Categorias';
  subheading = '';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
  
  constructor(
    public _categoriesService:CategoriesService,
    private route: ActivatedRoute,
    public router: Router,
    private _location: Location,
    private formBuilder: FormBuilder,
    private toastr: ToastrService

  ) { 
    this.categories = "";
    this.category = new Category();
  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      name: [this.route.snapshot.params.name, Validators.required]
    });

    if(this.route.snapshot.params.id == undefined){
      this.isUpdate = false;
      this.heading = "Nueva Categoria";
    }
    else{
      this.isUpdate = true;
      this.heading ="Editar Categoria";
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

    this.category.id = this.route.snapshot.params.id;
    this.category.name = this.registerForm.controls.name.value;
   
    if(this.isUpdate){
      //Update
      console.log(this.category);
      this._categoriesService.update(this.category).subscribe(
        response=>{
          console.log(response);

          this.toastr.success(this.category.name+' ha sido actualizado!','Actualizado', {
            timeOut: 5000,
          });

          this._location.back();
        }
      )
    }
    else{
      this._categoriesService.add(this.category).subscribe(
        response=>{
          console.log(response);
          this.toastr.success(this.category.name+' ha sido creado!','Creado', {
            timeOut: 5000,
          });
          this._location.back();
        }
      )
     
    }
  }


}
