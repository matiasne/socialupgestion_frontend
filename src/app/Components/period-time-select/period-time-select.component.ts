import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-period-time-select',
  templateUrl: './period-time-select.component.html',
  styleUrls: ['./period-time-select.component.sass']
})
export class PeriodTimeSelectComponent implements OnInit {

  @ViewChild('content') content: any;
  
  public periodo ={
    nombre:"",
    dia:"",
    desde:{
      hour:"0",
      minute:"0"
    },
    hasta:{
      hour:"0",
      minute:"0"
    },
  };

  closeResult: string;

  @Output() public retorno = new EventEmitter<any>();
  
  constructor(
    private modalService: NgbModal, 
  ) { 
    
  }

  ngOnInit() {
  }

  openModal(content){
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){ 

        switch(this.periodo.dia){
          case "1":
            this.periodo.nombre = "Lunes";
            break;
          case "2":
            this.periodo.nombre = "Martes";
            break;
          case "3":
            this.periodo.nombre = "Miercoles";
            break;
          case "4":
              this.periodo.nombre = "Jueves";
              break;
          case "5":
            this.periodo.nombre = "Viernes"; 
            break;
          case "6":
              this.periodo.nombre = "Sábado";
            break;
          case "7":
              this.periodo.nombre = "Domingo";
              break;
          case "8":
              this.periodo.nombre = "Feriados";            
          break;
        }

        console.log(this.periodo);
        this.periodo.desde.hour = this.n(this.periodo.desde.hour);
        this.periodo.desde.minute = this.n(this.periodo.desde.minute);
        this.periodo.hasta.hour = this.n(this.periodo.hasta.hour);
        this.periodo.hasta.minute = this.n(this.periodo.hasta.minute);
        this.retorno.emit(this.periodo);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private n(n){
    return n > 9 ? "" + n: "0" + n;
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
