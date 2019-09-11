import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-store',
  templateUrl: './service-store.component.html',
  styleUrls: ['./service-store.component.sass']
})
export class ServiceStoreComponent implements OnInit {

  heading = 'Nuevo Servicio';
  subheading = 'Rellenar todos los campos del formulario del nuevo servicio.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';

  constructor() { }
 
  ngOnInit() {
  }

}
