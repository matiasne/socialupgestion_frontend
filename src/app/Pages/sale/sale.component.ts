import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.sass']
})
export class SaleComponent implements OnInit {

  heading = 'Ventas';
  subheading = 'Listado de todas las ventas del comercio.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
  buttons = [{
    href:"/venta/guardar",
    icon:"plus",
    title:"Agregar Venta"
  }]

closeResult: string;
constructor(private modalService: NgbModal) {
    
  }

  ngOnInit() {
  }


}
