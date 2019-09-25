import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal ,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/Components/modal/modal.component';
import { ModalaboutComponent } from 'src/app/Components/modalabout/modalabout.component';
import { Subscription } from 'rxjs';
import { CommercesService } from 'src/app/Services/commerces.service';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/Services/clients.service';
import { ToastrService } from 'ngx-toastr';


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


  public clients:any;
  public commerce:any;
  private commerceSubscription: Subscription;

  clienteValue;
  closeResult: string;
  
  constructor(
    public _commerceService:CommercesService,
    public router: Router,
    public _clientsService:ClientsService,
    private toastr: ToastrService,
    private modalService: NgbModal,
  ) {
  
    this.commerce = "";
    this.commerceSubscription =  this._commerceService.getSelectedCommerce().subscribe(data=>{
      this.commerce = data;
    
      if(this.commerce == "0"){
        this.router.navigate(['/home']);
      }
    });
  }

  

  ngOnDestroy() {
    this.commerceSubscription.unsubscribe();
  }

  
  ngOnInit() {
    this.obtenerClientes();
  }

  obtenerClientes(){
    this.commerceSubscription =  this._clientsService.get().subscribe(data=>{
      this.clients = data;
      console.log(this.clients);
      if(this.clients == "0"){
        this.router.navigate(['/home']);
      }
    });
  }

  deleteClient(content,client,$event){
    $event.stopPropagation();
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "si"){
        this._clientsService.deleteClient(client).subscribe(
          response=>{
            this.toastr.info(client.name+' ha sido borrado!','Cliente Borrado', {
              timeOut: 5000,
            });
            this.obtenerClientes();
          }
        )
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

 
  public updateTable(){
    this.clienteValue="";
  }
}
