import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CommercesService } from 'src/app/Services/commerces.service';
import { Commerce } from 'src/app/Models/Commerce';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/Services/products.service';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/Services/categoryes.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {
  
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
  
  public categoryes:any;
  private categoryesSubscription: Subscription;


  constructor(
    public _productsServices:ProductsService,
    public router: Router,
    private toastr: ToastrService,
    private modalService: NgbModal, 
    private _categoriesService:CategoriesService
  ) {
    this.products = "";
    this.categoryes = [];
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
    this.categoryesSubscription.unsubscribe();
  }

  ngOnInit() {
    this.obtenerProductos();
  }
  
  obtenerProductos(){
    this.productSubscription =  this._productsServices.get().subscribe(data=>{
      this.products = data;      
    });

    this.categoryesSubscription =  this._categoriesService.get().subscribe(data=>{
      this.categoryes = data;
      console.log(this.categoryes);     
    });
  }

  deleteProducto(product){
    this._productsServices.delete(product).subscribe(
      response=>{
        this.toastr.info(product.name+' ha sido borrado!','Producto Borrado', {
          timeOut: 5000,
        });
        this.obtenerProductos();
      }
    )
  }

  open(content,product) {
    console.log(product);
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(result);
      if(result == "si"){
        this.deleteProducto(product)
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
