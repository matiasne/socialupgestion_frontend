import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CommercesService } from 'src/app/Services/commerces.service';
import { Commerce } from 'src/app/Models/Commerce';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from 'src/app/Services/Firestore/products.service';
import { CategoriesService } from 'src/app/Services/Firestore/categories.service';
import { SaleAddProductComponent } from 'src/app/Components/sale-add-product/sale-add-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {
  
  @ViewChild("saleAddProduct") saleAddProduct: SaleAddProductComponent;

  closeResult: string;
  heading = 'Productos';
  subheading = 'Listado de todos los productos del comercio.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
  buttons = [{
    href:"/product",
    icon:"plus",
    title:"Agregar Producto"
  }]

  public products:any;
  private productSubscription: Subscription;
  
  
  serviceValue;
  
  public productoSeleccionado:any;
  public categories:any;
  private categoriesSubscription: Subscription;


  constructor(
    public _productsServices:ProductsService,
    public router: Router,
    private toastr: ToastrService,
    private _categoriesService:CategoriesService
  ) {
    this.products = "";
    this.categories = [];
  }

  ngOnDestroy() {
    if(this.productSubscription)
      this.productSubscription.unsubscribe();
    if(this.categoriesSubscription)
      this.categoriesSubscription.unsubscribe();
  }

  ngOnInit() {

    this.productSubscription = this._productsServices.getAll().subscribe((snapshot) => {
      this.products = [];
      snapshot.forEach((snap: any) => {
        this.products.push(snap.payload.doc.data());
        this.products[this.products.length - 1].id = snap.payload.doc.id;        
      });
      console.log(this.products);
    });

  }

  selecionarProducto(product){
    this.productoSeleccionado = product;
    this.saleAddProduct.openModal(product);    
  }

  public agregarVenta(venta) {
        
  }
  



}
