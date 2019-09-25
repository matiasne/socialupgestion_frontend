import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.sass']
})
export class SubscriptionComponent implements OnInit {

  heading = 'Subscripcion';
  subheading = 'Listado de todas las subscripciones del comercio.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
  buttons = [{
    href:"/subscription",
    icon:"plus",
    title:"Nueva Suscripcion"
  }]

  closeResult: string;
  subscription:any=[];
  startdateValue;
  enddateValue;
  estadoValue;
  periodValue;
  clienteValue;


  status:any =[];
  perid:any = [];

  currentDate() {
    const currentDate = new Date();
    return currentDate.toISOString().substring(0,10);
  }

constructor(private modalService: NgbModal, public router: Router) {
    this.subscription=[];

    this.status=["Anticipado","Vencido"];
    this.perid=["1","2","3","4","5","6","7","8","9","10","11","12"];
    
}

  ngOnInit() {
    this.subscription = [{
      id: "1",
      name: "Pedro",
      empleado: "Hola",
      fecha: this.currentDate(),
      period: "1",
      status: "Anticipado",
      statusSub:"Activo",
      total: 1200,
      servicios: JSON.stringify({
        "name" : "Pizzas",
        "price" : 1200
      })
    }]
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
    this.periodValue="";
    this.startdateValue="";
    this.enddateValue="";
  }
  
  public changeStatus(event){
    this.periodValue="";
    this.clienteValue="";
    this.startdateValue="";
    this.enddateValue="";
  }

  public changePeriod(event){
    this.estadoValue = "";
    this.clienteValue="";
    this.startdateValue="";
    this.enddateValue="";
  }

  public changeDate(event){
    this.estadoValue = "";
    this.periodValue="";
    this.clienteValue="";
  }

  public updateTable(){
    this.startdateValue="";
    this.enddateValue="";
    this.estadoValue = "";
    this.periodValue="";
    this.clienteValue="";
  }

}
