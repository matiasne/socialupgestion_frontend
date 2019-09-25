import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.sass']
})
export class EditProductComponent implements OnInit {
  
  registerFormProduct: FormGroup;
  closeResult: string;
  submitted: boolean;

  heading;
  subheading;
  icon;
  

  constructor(private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
    ) { 
      
    }

  ngOnInit() {
    this.registerFormProduct = this.formBuilder.group({
      name:[this.route.snapshot.params.name, Validators.required],
      code:[this.route.snapshot.params.code],
      commerce_id:[this.route.snapshot.params.commerce_id],
      category_id:[this.route.snapshot.params.category_id],
      description:[this.route.snapshot.params.description],
      imgproduct:[this.route.snapshot.params.imgproduct],
      price:[this.route.snapshot.params.price,Validators.required],
      provider_id:[this.route.snapshot.params.provider_id],
      stock:[this.route.snapshot.params.stock,Validators.required]
    });

    if(this.route.snapshot.params.id != undefined){
      this.heading = 'Actualizar Producto';
      this.subheading = 'Modificar campos para actualizar el producto.';
      this.icon = 'pe-7s-phone icon-gradient bg-premium-dark';
    
    }else{

      this.heading = 'Cargar Producto';
      this.subheading = 'Completar los campos para crear el nuevo producto.';
      this.icon = 'pe-7s-phone icon-gradient bg-premium-dark';
    }
  }

  
  get prod(){
    return this.registerFormProduct.controls;
  }

  Guardar(){

    this.submitted = true;

    if (this.registerFormProduct.invalid) {
      return;
    }
  }

}
