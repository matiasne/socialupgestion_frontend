import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

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
    href:"/sale",
    icon:"plus",
    title:"Agregar Venta",
  }]

   
  registerFormFilter: FormGroup;

  submitted= false;

  sales:any=[];
  productos:any=[];

  prod:any=[];
  serv:any=[];
  
  paymethod:any=[];
  status:any=[];

  closeResult: string;

  result: any[] = [];

  estadoValue;
  paymentValue;
  clienteValue;
  startdateValue;
  enddateValue;
  
constructor(
  private modalService: NgbModal, 
  public router: Router,
  private formBuilder: FormBuilder
  ) {
    this.sales=[];
    this.productos=[];

    this.prod=[];
    this.serv=[];

    this.paymethod=["Efectivo","Credito","Debito","Descuentos","Cuenta Corriente"];

    this.status=["Pagado","Pendiente","Cancelado"];
    
  }
 
  ngOnInit() {

    this.sales = [{
      id: "1",
      name: "Pedro",
      empleado: "Hola",
      fecha: "2019-12-02",
      pago: "Debito",
      status:"Pagado",
      total: 1600,
      productos : JSON.stringify({
        "name": "Jugo",
        "count": "2",
        "price" : 200
      }),
      servicios: JSON.stringify({
        "name": "Pizzas",
        "price": 1200
      }),
      descripcion: "sadfsadf"
    },{
      id: "2",
      name: "Pedro2",
      empleado: "Hola",
      fecha: "2019-02-01",
      pago: "Efectivo",
      status:"Pendiente",
      total: 1600,
      productos:JSON.stringify({
        "name": "Jugo",
        "count": "2",
        "price" : 200
      }),
      servicios: JSON.stringify({
        "name" : "Pizzas",
        "price" : 1200
      }),
      descripcion: "sadfsadf"
    }];
    
  }

  open(content, $event) {
    $event.stopPropagation();
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      
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

  public changeCliente(event){
    this.estadoValue = "";
    this.paymentValue="";
    this.startdateValue="";
    this.enddateValue="";
  }
  
  public changeStatus(event){
    this.paymentValue="";
    this.clienteValue="";
    this.startdateValue="";
    this.enddateValue="";
  }

  public changePayment(event){
    this.estadoValue = "";
    this.clienteValue="";
    this.startdateValue="";
    this.enddateValue="";
  }

  public changeDate(event){
    this.estadoValue = "";
    this.paymentValue="";
    this.clienteValue="";
  }

  public updateTable(){
    this.startdateValue="";
    this.enddateValue="";
    this.estadoValue = "";
    this.paymentValue="";
    this.clienteValue="";
  }

}
