import { Component, OnInit } from '@angular/core';

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
    href:"/proveedor/guardar",
    icon:"plus",
    title:"Agregar Caja"
  }]

  constructor() { }

  ngOnInit() {
  }

}
