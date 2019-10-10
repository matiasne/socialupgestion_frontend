import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PaydesksService } from 'src/app/Services/Firestore/paydesks.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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

  paydesks:any=[];
  closeResult: string;

  private paydesksSubscription: Subscription;

  constructor(
    private modalService: NgbModal,
    private _paydesksService:PaydesksService,
    private toastr: ToastrService,
  ) { 
    this.paydesksSubscription = this._paydesksService.getAll().subscribe((snapshot) => {
      this.paydesks = [];
      snapshot.forEach((snap: any) => {
        this.paydesks.push(snap.payload.doc.data());
        this.paydesks[this.paydesks.length - 1].id = snap.payload.doc.id;        
      });
      console.log(this.paydesks);
    });
  }

  ngOnInit() {
    
  }

  
  ngOnDestroy() {
    if(this.paydesksSubscription)
      this.paydesksSubscription.unsubscribe();
  }

  delete(content,paydesk){

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){     
        console.log(paydesk.id);
        this.toastr.info(paydesk.name+' ha sido borrado!','Caja Borrada', {
          timeOut: 5000,
        });      
        this._paydesksService.delete(paydesk.id).then(() => {
                 
        }, (error) => {
          console.error(error);
        });      
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
