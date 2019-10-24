import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SaleService } from 'src/app/Services/Globals/sale.service';
import { Product } from 'src/app/Models/Product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sale-add-product',
  templateUrl: './sale-add-product.component.html',
  styleUrls: ['./sale-add-product.component.sass']
})
export class SaleAddProductComponent implements OnInit {

  closeResult: string;
  
  @ViewChild('content') content: any;

  private product:Product;  
  @Input() titulo:any='';
  
  @Output() public ventaDetalles = new EventEmitter<string>();

  public venta:any;
  
  constructor(
    private modalService: NgbModal, 
    private _saleservice:SaleService,    
    private toastr: ToastrService,
  ) { 
    this.venta = {
      cantidad:1,
      total:0
    }
  }

  ngOnInit() {
    
  }



  openModal(product){
    this.product = product;
    this.product.price = 12;
    this.calcularTotal();
    this.modalService.open(this.content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){  
        this.toastr.success('El producto ha sido agregado!','Producto Agregado', {
          timeOut: 5000,
        });
        this._saleservice.addProduct(this.product,this.venta.cantidad);  
        this.ventaDetalles.emit(this.venta);
        this.venta.cantidad = 1;
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

  calcularTotal(){
    this.venta.total = this.venta.cantidad * this.product.price;
  }

}
