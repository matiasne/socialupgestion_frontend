import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/Components/modal/modal.component';
import { ModalaboutComponent } from 'src/app/Components/modalabout/modalabout.component';


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


  ngOnInit() {
  }

  title = 'app';

  constructor(private modalService: NgbModal) {}

  open() {
    // const modalRef = this.modalService.open(ModalComponent);
    const modalRef = this.modalService.open(ModalaboutComponent);
    modalRef.componentInstance.title = 'About';
  }
}
