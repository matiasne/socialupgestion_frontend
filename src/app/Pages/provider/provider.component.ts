import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.sass']
})
export class ProviderComponent implements OnInit {
  
  heading = 'Proveedores';
  subheading = 'Listado de todos los proveedores del comercio.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
  buttons = [{
    href:"/proveedor/guardar",
    icon:"plus",
    title:"Agregar Proveedor"
  }]

  constructor() { }

  ngOnInit() {
  }

}
