import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/Components/modal/modal.component';
import { ModalaboutComponent } from 'src/app/Components/modalabout/modalabout.component';
import { Subscription } from 'rxjs';
import { CommercesService } from 'src/app/Services/commerces.service';
import { Router } from '@angular/router';


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
    href:"/cliente/guardar",
    icon:"plus",
    title:"Agregar Cliente"
  }]



  public commerce:any;
  private commerceSubscription: Subscription;
  
  constructor(
    private modalService: NgbModal,
    public _commerceService:CommercesService,
    public router: Router,
  ) {
  
    this.commerce = "";
    this.commerceSubscription =  this._commerceService.getSelectedCommerce().subscribe(data=>{
      this.commerce = data;
      console.log(this.commerce);

      if(this.commerce == "0"){
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnDestroy() {
    this.commerceSubscription.unsubscribe();
  }

  
  ngOnInit() {
  }

  open() {
    // const modalRef = this.modalService.open(ModalComponent);
    const modalRef = this.modalService.open(ModalaboutComponent);
    modalRef.componentInstance.title = 'About';
  }
}
