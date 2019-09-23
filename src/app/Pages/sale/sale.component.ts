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
  
constructor(
  private modalService: NgbModal, 
  public router: Router,
  private formBuilder: FormBuilder
  ) {
    this.sales=[];
    this.productos=[];

    this.prod=[];
    this.serv=[];
    this.paymethod=[{
      name: "Efectivo"
    },{
      name: "Credito"
    },{
      name: "Debito"
    }];

    this.status=["Pagado","Pendiente","Cancelado"];
    
  }
 
  ngOnInit() {

    this.sales = [{
      id: "1",
      cliente: "Pedro",
      empleado: "Hola",
      fecha: "12-02-2019",
      pago: "Debito",
      estado:"Pagado",
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
      cliente: "Pedro2",
      empleado: "Hola",
      fecha: "12-02-2019",
      pago: "Efectivo",
      estado:"Pendiente",
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
    

    this.registerFormFilter = this.formBuilder.group({
      methodpayment: ['', Validators.required],
      
    });
    
  }


  filter(){
    return this.registerFormFilter.controls;
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

  public salesFilter(sales: any[]): any[] {

      this.result = sales/*.filter(item => item.pago == "Efectivo")*/;

      return this.result;
  }

  /**
   * search
   */
  public search() {

    this.submitted = true;

    //let approved = this.sales.filter(sale => sale.pago == (this.registerFormFilter.controls['methodpayment'].value));

    this.result= this.sales.filter(sale => sale.pago == (this.registerFormFilter.controls['methodpayment'].value));

    /*this.sales = this.sales.slice();

    this.sales.push(approved);*/

   
    /*
    for (let i = 0; i <= this.sales.length; i++) {
      this.sales.pop(i);
    }

    for (let e = 0; e < approved.length; e++) {
      this.prod = JSON.parse((approved[e].productos));
      this.serv = JSON.parse((approved[e].servicios));
      let i = approved[e].id;
      let c = approved[e].cliente;
      let em = approved[e].empleado;
      let f = approved[e].fecha;
      let es = approved[e].estado;
      let p = approved[e].pago;
      let t = approved[e].total;
      let d = approved[e].descripcion

      this.sales.push({
        id: i,
        cliente: c,
        empleado: em,
        fecha: f,
        pago: p,
        estado:es,
        total:t,
        productos:JSON.stringify({
          "name": this.prod['name'],
          "count":this.prod['count'] ,
          "price" : this.prod['price']
        }),
        servicios: JSON.stringify({
          "name": this.serv['name'],
          "price": this.serv['price']
        }),
        descripcion:d
      });
    }*/
    
  }

}
