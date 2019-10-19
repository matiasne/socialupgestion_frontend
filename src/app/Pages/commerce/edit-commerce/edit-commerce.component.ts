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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageSelectComponent } from 'src/app/Components/image-select/image-select.component';
import { LocationSelectComponent } from 'src/app/Components/location-select/location-select.component';
import { CategoriesService } from 'src/app/Services/Firestore/categories.service';
import { PeriodTimeSelectComponent } from 'src/app/Components/period-time-select/period-time-select.component';

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
  
  public commerce:Commerce;
  public isUpdate:boolean;
  registerForm: FormGroup;
  submitted = false;

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
    public _categoriesService:CategoriesService
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

  public setearPeriodo(periodo){
    console.log(periodo);
    let p = JSON.parse(JSON.stringify(periodo));
    this.commerce.horarios.push(p);
    console.log(this.commerce);

  }

  public borrarPeriodo(index){
    this.commerce.horarios.splice(index,1);
  }
  
}


