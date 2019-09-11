import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-update',
  templateUrl: './service-update.component.html',
  styleUrls: ['./service-update.component.sass']
})
export class ServiceUpdateComponent implements OnInit {
  
  heading = 'Actualizar Servicio';
  subheading = 'Modificar campos para actualizar el servicio.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';

  constructor() { }

  ngOnInit() {
  }

}
