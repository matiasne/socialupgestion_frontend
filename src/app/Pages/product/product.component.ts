import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { CommercesService } from 'src/app/Services/commerces.service';
import { Commerce } from 'src/app/Models/Commerce';
import { Router } from '@angular/router';

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
    href:"/producto/guardar",
    icon:"plus",
    title:"Agregar Producto"
  }]

  public commerce:any;
  private commerceSubscription: Subscription;
  
  constructor(
    private modalService: NgbModal,
    public _commerceService:CommercesService,
    public router: Router,
  ) {
  
    this.commerce = "";
    this.commerceSubscription =  this._commerceService.getSelectedCommerce().subscribe(data=>{
      this.commerce = data;
      console.log(this.commerce);

      if(this.commerce == "0"){
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnDestroy() {
    this.commerceSubscription.unsubscribe();
  }

  ngOnInit() {

  }



  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(result);
      if(result == "si"){
        alert("Borrado");
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


  selecionarProduct(product){
    this.router.navigate(['/producto/actualizar'], { state: { 
      name: product.name,
      commerce_id:product.commerce_id,
      provider_id:product.provider_id,
      category_id:product.category_id,
      code:product.code,
      description:product.description,
      price:product.price,
      stock:product.stock,
    } });
  }

}
