import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-caja-store',
  templateUrl: './caja-store.component.html',
  styleUrls: ['./caja-store.component.sass']
})
export class CajaStoreComponent implements OnInit {

  heading = 'Nueva Caja';
  subheading = 'Rellenar todos los campos del formulario de la nueva caja.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';

  constructor() { }

  ngOnInit() {
  }

}
