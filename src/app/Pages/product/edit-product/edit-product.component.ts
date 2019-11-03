import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/Models/Product';
import { CategoriesService } from 'src/app/Services/Firestore/categories.service';
import { ProvidersService } from 'src/app/Services/Firestore/providers.service';
import { ProductsService } from 'src/app/Services/Firestore/products.service';
import { ImageSelectComponent } from 'src/app/Components/image-select/image-select.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommercesService } from 'src/app/Services/Firestore/commerces.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.sass']
})
export class EditProductComponent implements OnInit {

  @ViewChild("iconSelect") iconSelect: ImageSelectComponent;
  @ViewChild("portadaSelect") portadaSelect: ImageSelectComponent;
  
  
  closeResult: string;

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
    private _commerceService:CommercesService,
    private _providerService:ProvidersService,    
    private modalService: NgbModal, 
  ) {
    this.product = new Product();
   }

  ngOnInit() {

    this.categoriesSubscription = this._commerceService.getSelectedCommerce().subscribe(data=>{
      console.log(data);   
      this.categories = data.productCategories;
      
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
      category: [this.route.snapshot.params.category],
      description: [this.route.snapshot.params.description],
    });

    
    if(this.route.snapshot.params.id){
      let editSubscribe =  this._productsService.get(this.route.snapshot.params.id).subscribe((product:any) => {
        
        this.isUpdate = true;
        this.heading ="Editar Producto";

        console.log(product.payload.data());
        
        this.registerForm.setValue({
          name: product.payload.data().name,
          price: product.payload.data().price,
          description: product.payload.data().description,
          category: product.payload.data().category,
          stock: product.payload.data().stock,
          code: product.payload.data().code,
          provider_id: product.payload.data().provider_id
        });
        this.product.icon = product.payload.data().icon;
        this.product.name = product.payload.data().name;
        this.product.portada = product.payload.data().portada;

        editSubscribe.unsubscribe();
      });
    }
    else{
      this.isUpdate = false;
      this.heading = "Nuevo Producto";
    }  


  }

  openAddIcon() {
    // and use the reference from the component itself
    this.iconSelect.openModal(this.iconSelect.content);
  }

  openAddPortada(){
    this.portadaSelect.openModal(this.portadaSelect.content);
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
    this.product.stock = this.registerForm.controls.stock.value;
    this.product.price = this.registerForm.controls.price.value;
    this.product.code = this.registerForm.controls.code.value;
    this.product.provider_id = this.registerForm.controls.provider_id.value;
    this.product.category = this.registerForm.controls.category.value;
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

  public iconoImagen(imagen) {
    console.log(imagen);
    this.product.icon = imagen;
  }

  public portadaImagen(imagen) {
    console.log(imagen);
    this.product.portada = imagen;
  }

  
  deleteProducto(content){
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){     
        this.toastr.info(this.product.name+' ha sido borrado!','Producto Borrado', {
          timeOut: 5000,
        }); 
        this.router.navigate(['/products']);
        this._productsService.delete(this.route.snapshot.params.id).then(() => {
            
        }, (error) => {
          console.error(error);
        });      
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
