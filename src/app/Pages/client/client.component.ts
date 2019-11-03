import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal ,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/Components/modal/modal.component';
import { ModalaboutComponent } from 'src/app/Components/modalabout/modalabout.component';
import { Subscription } from 'rxjs';
import { CommercesService } from 'src/app/Services/commerces.service';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/Services/Firestore/clients.service';
import { ToastrService } from 'ngx-toastr';
import { SaleService } from 'src/app/Services/Globals/sale.service';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.sass']
})
export class ClientComponent implements OnInit {

  heading = 'Clientes';
  subheading = 'Listado de todos los clientes del comercio.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
  buttons = [{
    href:"/client",
    icon:"plus",
    title:"Agregar Cliente"
  }]

  isActive:any;

  public clients:any[];
  public commerce:any;
  private clientsSubscription: Subscription;

  clienteValue;
  closeResult: string;
  
  constructor(
    public _commerceService:CommercesService,
    public router: Router,
    public _clientsService:ClientsService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private _saleService:SaleService
  ) {  
    this.commerce = "";    
  }

  

  ngOnDestroy() {
    if(this.clientsSubscription)
      this.clientsSubscription.unsubscribe();
  }

  
  ngOnInit() {
        
    this.clientsSubscription = this._clientsService.getAll().subscribe((clientSnapshot) => {
      this.clients = [];
      clientSnapshot.forEach((clientData: any) => {
        this.clients.push(clientData.payload.doc.data());
        this.clients[this.clients.length - 1].id = clientData.payload.doc.id;        
      });
      console.log(this.clients);
    });
  }


  deleteClient(content,client){
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){     
        console.log(client.id);
        this.toastr.info(client.name+' ha sido borrado!','Cliente Borrado', {
          timeOut: 5000,
        });      
        this._clientsService.delete(client.id).then(() => {
                 
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

  public agregarClienteAVenta(client){
    this._saleService.addClient(client);
    this.toastr.success('El cliente ha sido asignado a la venta!','Cliente Asignado a venta', {
      timeOut: 5000,
    });
  }
 
  public updateTable(){
    this.clienteValue="";
  }
}
