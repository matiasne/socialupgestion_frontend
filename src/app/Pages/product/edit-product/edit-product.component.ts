import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/Models/Product';
import { CategoriesService } from 'src/app/Services/Firestore/categories.service';
import { ProvidersService } from 'src/app/Services/Firestore/providers.service';
import { ProductsService } from 'src/app/Services/Firestore/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.sass']
})
export class EditProductComponent implements OnInit {

  public product:Product;

  public categories:any;
  private categoriesSubscription: Subscription;

  public providers:any;
  private providerSubscription: Subscription;

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
    public _productsService:ProductsService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _categoriesService:CategoriesService,
    private _providerService:ProvidersService
  ) {
    this.product = new Product();
   }

  ngOnInit() {

    this.categoriesSubscription = this._categoriesService.getAll().subscribe((snapshot) => {
      this.categories = [];
      snapshot.forEach((snap: any) => {
        this.categories.push(snap.payload.doc.data());
        this.categories[this.categories.length - 1].id = snap.payload.doc.id;        
      });
      console.log(this.categories);
    });

    this.providerSubscription = this._providerService.getAll().subscribe((snapshot) => {
      this.providers = [];
      snapshot.forEach((snap: any) => {
        this.providers.push(snap.payload.doc.data());
        this.providers[this.providers.length - 1].id = snap.payload.doc.id;        
      });
      console.log(this.providers);
    });


    this.registerForm = this.formBuilder.group({
      name: [this.route.snapshot.params.name, Validators.required],
      stock: [this.route.snapshot.params.stock],
      price: [this.route.snapshot.params.price],
      code: [this.route.snapshot.params.code],
      provider_id: [this.route.snapshot.params.provider_id],
      category_id: [this.route.snapshot.params.category_id],
      description: [this.route.snapshot.params.description],
      img: [this.route.snapshot.params.img],
    });

    
    if(this.route.snapshot.params.id){
      let editSubscribe =  this._productsService.get(this.route.snapshot.params.id).subscribe((service:any) => {
        
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

    this.product.id = this.route.snapshot.params.id;
    this.product.name = this.registerForm.controls.name.value;
    this.product.img = this.registerForm.controls.img.value;
    this.product.stock = this.registerForm.controls.stock.value;
    this.product.price = this.registerForm.controls.price.value;
    this.product.code = this.registerForm.controls.code.value;
    this.product.provider_id = this.registerForm.controls.provider_id.value;
    this.product.category_id = this.registerForm.controls.category_id.value;
    this.product.description = this.registerForm.controls.description.value;
   
    if(this.isUpdate){
      //Update
      console.log(this.product);
      this.toastr.success(this.product.name+' ha sido actualizado!','Producto Actualizado', {
        timeOut: 5000,
      });    

      this._productsService.update(this.product.id.toString(), this.product).then(() => {        
            
      }, (error) => {
        console.log(error);
      });
      this._location.back();
      
    }
    else{

      this.toastr.success(this.product.name+' ha sido creado!','Producto Creado', {
        timeOut: 5000,
      });
      this._productsService.create(this.product).then(() => {
        
      }, (error) => {
        console.error(error);        
      });  
      this._location.back();
    }
  }

}
