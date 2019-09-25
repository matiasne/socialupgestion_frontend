import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.sass']
})
export class CajaComponent implements OnInit {
  
  heading = 'Cajas';
  subheading = 'Listado de todos las cajas del comercio.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
  buttons = [{
    href:"/caja",
    icon:"plus",
    title:"Agregar Caja"
  }]

  cajas:any=[];
  closeResult: string;

  constructor(private modalService: NgbModal,) { 
    this.cajas=[{
      name:"Caja uno",
      total: 1500
    },{
      name: "Caja dos",
      total: 1000
    }];
  }

  ngOnInit() {
  }

  open(content,caja,$event){

    $event.stopPropagation();
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      console.log(result);
      if(result == "si"){
        
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
