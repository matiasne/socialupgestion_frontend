import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.sass']
})
export class ServiceComponent implements OnInit {

  heading = 'Servicios';
  subheading = 'Listado de todos los servicios del comercio.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
  buttons = [{
    href:"/servicio/guardar",
    icon:"plus",
    title:"Agregar Servicio"
  }]

  constructor() { }

  ngOnInit() {
  }

}
