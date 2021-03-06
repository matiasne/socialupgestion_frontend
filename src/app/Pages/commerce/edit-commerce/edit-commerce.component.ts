import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from 'src/app/Models/Client';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/Services/clients.service';
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';
import { Commerce } from 'src/app/Models/Commerce';
import { CommercesService } from 'src/app/Services/Firestore/commerces.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ImageSelectComponent } from 'src/app/Components/image-select/image-select.component';
import { LocationSelectComponent } from 'src/app/Components/location-select/location-select.component';
import { CategoriesService } from 'src/app/Services/Firestore/categories.service';
import { PeriodTimeSelectComponent } from 'src/app/Components/period-time-select/period-time-select.component';
import { CommerceAddPaydeskComponent } from 'src/app/Components/commerce-add-paydesk/commerce-add-paydesk.component';
import { CommerceAddCategoryProductComponent } from 'src/app/Components/commerce-add-category-product/commerce-add-category-product.component';
import { CommerceAddCategoryServiceComponent } from 'src/app/Components/commerce-add-category-service/commerce-add-category-service.component';
import { Paydesk } from 'src/app/Models/Paydesk';
import { CommerceSelectCategoryComponent } from 'src/app/Components/commerce-select-category/commerce-select-category.component';

@Component({
  selector: 'app-edit-commerce',
  templateUrl: './edit-commerce.component.html',
  styleUrls: ['./edit-commerce.component.sass']
})
export class EditCommerceComponent implements OnInit {

  @ViewChild("iconSelect") iconSelect: ImageSelectComponent;
  @ViewChild("portadaSelect") portadaSelect: ImageSelectComponent;
  @ViewChild("locationSelect") locationSelect: LocationSelectComponent;
  @ViewChild("periodoSelect") periodoSelect: PeriodTimeSelectComponent;
  @ViewChild("asignarCaja") asignarCaja: CommerceAddPaydeskComponent;
  @ViewChild("agregarCategoriaProducto") agregarCategoriaProducto: CommerceAddCategoryProductComponent;
  @ViewChild("agregarCategoriaServicio") agregarCategoriaServicio: CommerceAddCategoryServiceComponent;
  @ViewChild("agregarComercioCategoria") agregarComercioCategoria: CommerceSelectCategoryComponent;
  
  

  public commerce:Commerce;
  public isUpdate:boolean;
  registerForm: FormGroup;
  submitted = false;

  closeResult: string;

  public commerce_icon:string = "";

  public categories:any;
  private categoriesSubscription: Subscription;

  public diaEditando:number;

  heading = 'Comercio';
  subheading = '';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private _location: Location,
    public _commercesService:CommercesService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public _categoriesService:CategoriesService,    
    private modalService: NgbModal,
  ) { 
    this.commerce = new Commerce();    
  }

  openAddIcon() {
    // and use the reference from the component itself
    this.iconSelect.openModal(this.iconSelect.content);
  }

  openAddPortada(){
    this.portadaSelect.openModal(this.portadaSelect.content);
  }

  openAddLocation(){
    this.locationSelect.openModal(this.locationSelect.content);
  }


  ngOnInit() {  

    this.categoriesSubscription = this._categoriesService.getCommerceCategories().subscribe((snapshot) => {
      this.categories = [];
      snapshot.forEach((snap: any) => {
        this.categories.push(snap.payload.doc.data());
        this.categories[this.categories.length - 1].id = snap.payload.doc.id;        
      });
      console.log(this.categories);
    });

    this.registerForm = this.formBuilder.group({
      name: [this.route.snapshot.params.name, Validators.required],
      address: [this.route.snapshot.params.address],
      phone_number: [this.route.snapshot.params.phone_number],
      email: [this.route.snapshot.params.email],
      description: [this.route.snapshot.params.description],
      category_id: [this.route.snapshot.params.category_id],
    });  

  
    if(this.route.snapshot.params.id){
      let editSubscribe =  this._commercesService.get(this.route.snapshot.params.id).subscribe((commerce:any) => {
        
        console.log(commerce.payload.data())
        this.isUpdate = true;
        this.heading ="Editar Comercio";
        
        this.registerForm.setValue({
          name: commerce.payload.data().name,
          address: commerce.payload.data().address,
          phone_number: commerce.payload.data().phone_number,
          email: commerce.payload.data().email,
          description: commerce.payload.data().description,
          category_id: commerce.payload.data().category_id,
        });
        this.commerce.icon = commerce.payload.data().icon;
        this.commerce.portada = commerce.payload.data().portada;
        this.commerce.lat = commerce.payload.data().lat;
        this.commerce.lng = commerce.payload.data().lng;
        this.commerce.horarios = commerce.payload.data().horarios;
        this.commerce.paydesks = commerce.payload.data().paydesks;
        this.commerce.productCategories = commerce.payload.data().productCategories;
        this.commerce.serviceCategories = commerce.payload.data().serviceCategories;
        this.commerce.categories = commerce.payload.data().categories;

        editSubscribe.unsubscribe();
      });
    }
    else{
      this.isUpdate = false;
      this.heading = "Nuevo Comercio";
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

    this.commerce.name = this.registerForm.controls.name.value;
    this.commerce.address = this.registerForm.controls.address.value;
    this.commerce.phone_number = this.registerForm.controls.phone_number.value;
    this.commerce.email = this.registerForm.controls.email.value;
    this.commerce.description = this.registerForm.controls.description.value;
    this.commerce.category_id = this.registerForm.controls.category_id.value;

    if(this.commerce.horarios.length == 0){
      this.toastr.error('Por favor Agrege un horario al comercio','Error al guardar comercio', {
        timeOut: 5000,
      });  
      return;
    }

    if(this.commerce.paydesks.length == 0){
      this.toastr.error('Por favor Agrege una caja al comercio','Error al guardar comercio', {
        timeOut: 5000,
      });  
      return;
    }

    if(this.commerce.productCategories.length == 0){
      this.toastr.error('Por favor Agrege una categoria de productos al comercio','Error al guardar comercio', {
        timeOut: 5000,
      });  
      return;
    }

    if(this.commerce.serviceCategories.length == 0){
      this.toastr.error('Por favor Agrege una categoria de servicios al comercio','Error al guardar comercio', {
        timeOut: 5000,
      });  
      return;
    }
   
    if(this.isUpdate){
      //Update
      console.log(this.commerce);
      this.toastr.success(this.commerce.name+' ha sido actualizado!','Comercio Actualizado', {
        timeOut: 5000,
      });    

      this._commercesService.update(this.route.snapshot.params.id, this.commerce).then(() => {        
            
      }, (error) => {
        console.log(error);
      });
      this._location.back();
      
    }
    else{

      this.toastr.success(this.commerce.name+' ha sido creado!','Comercio Creado', {
        timeOut: 5000,
      });
      this._commercesService.create(this.commerce).then(() => {
        
      }, (error) => {
        console.error(error);        
      });  
      this._location.back();
    }
  }

  public iconoImagen(imagen) {
    console.log(imagen);
    this.commerce.icon = imagen;
  }

  public portadaImagen(imagen) {
    console.log(imagen);
    this.commerce.portada = imagen;
  }

  public setearLocalizacion(json){
    console.log(json);
    let location:any = JSON.parse(json);
    this.commerce.lat = location.lat;
    this.commerce.lng = location.lng;
  }

  public openAddHorario (){
    this.periodoSelect.openModal(this.periodoSelect.content);
  }

  public openAddComercioCategoria(){

    if(this.commerce.categories.length > 2){
      this.toastr.error('Solo puede agregar hasta 3 categorias','Maximo de categorias superado', {
        timeOut: 5000,
      });  
      return;
    }
    this.agregarComercioCategoria.openModal();
  }

  public openAddProductCategory (){
    this.agregarCategoriaProducto.openModal();
  }

  public openAddServiceCategory (){
    this.agregarCategoriaServicio.openModal();
  }

  public openAddCaja (){
    this.asignarCaja.openModal();
  }

  public setearPeriodo(periodo){
    console.log(periodo);
    let p = JSON.parse(JSON.stringify(periodo));
    this.commerce.horarios.push(p);
    console.log(this.commerce);
  }

  public addCategoriaProducto(categoria){

    var repetido = false;
    this.commerce.productCategories.forEach(c =>{
      if(c == categoria){
        this.toastr.error('El nombre de categoría ya existe!','Categoria no guardada', {
          timeOut: 5000,
        });
        repetido = true;
      }
    });
    if(!repetido){
      this.toastr.success('Categoria asignada a commercio!','Categoria Guardada', {
        timeOut: 5000,
      });
      this.commerce.productCategories.push(categoria);
    }
    console.log(this.commerce);
  }

  public addCategoriaComercio(categoria){
    var repetido = false;
    this.commerce.categories.forEach(c =>{
      if(c == categoria){
        this.toastr.error('El nombre de categoría ya existe!','Categoria no asignada', {
          timeOut: 5000,
        });
        repetido = true;
      }
    });
    if(!repetido){
      this.toastr.success('Categoria asignada a commercio!','Categoria asignada', {
        timeOut: 5000,
      });
      this.commerce.categories.push(categoria);
    }
  }

  public addCategoriaService(categoria){

    var repetido = false;
    this.commerce.serviceCategories.forEach(c =>{
      if(c == categoria){
        this.toastr.error('El nombre de categoría ya existe!','Categoria no guardada', {
          timeOut: 5000,
        });
        repetido = true;
      }
    });
    if(!repetido){
      this.toastr.success('Categoria asignada a commercio!','Categoria Guardada', {
        timeOut: 5000,
      });
      this.commerce.serviceCategories.push(categoria);
    }
  }

  public deleteCategoriaProducto(index){
    this.commerce.productCategories.splice(index,1);
  }

  public deleteCategoriaComercio(index){
    this.commerce.categories.splice(index,1);
  }

  public deleteCategoriaServicio(index){
    this.commerce.serviceCategories.splice(index,1);
  }

  public agregarCaja(caja){
    console.log(caja);
    let p = JSON.parse(JSON.stringify(caja));

    var repetido = false;
    this.commerce.paydesks.forEach(paydesk =>{
      if(paydesk == caja){
        this.toastr.error('El nombre de caja ya existe!','Caja no guardada', {
          timeOut: 5000,
        });        
      }
      repetido = true;
    });
    if(!repetido){
      this.toastr.success('Caja asignada a commercio!','Caja Guardada', {
        timeOut: 5000,
      });
      this.commerce.paydesks.push(caja);
    }
    console.log(this.commerce);
  }

  public borrarPeriodo(index){
    this.commerce.horarios.splice(index,1);
  }

  public borrarCaja(index){
    this.commerce.paydesks.splice(index,1);
  }

  
  deleteCommerce(content){  

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){
        this._commercesService.delete(this.route.snapshot.params.id).then(() => {
                 
        }, (error) => {
          console.error(error);
        }); 
        this.router.navigate(['/commerces']); 
        this.toastr.info(this.registerForm.controls.name.value+' ha sido borrado!','Comercio Borrado', {
          timeOut: 5000,
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


