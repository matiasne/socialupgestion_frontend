import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PaydesksService } from 'src/app/Services/paydesks.service';

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
    href:"/paydesk",
    icon:"plus",
    title:"Agregar Caja"
  }]

  cajas:any=[];
  closeResult: string;

  constructor(
    private modalService: NgbModal,
    private _paydesksService:PaydesksService
  ) { 
    this._paydesksService.get().subscribe(data=>{
      this.cajas = data;
    })
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
