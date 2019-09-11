import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-provider-update',
  templateUrl: './provider-update.component.html',
  styleUrls: ['./provider-update.component.sass']
})
export class ProviderUpdateComponent implements OnInit {

  heading = 'Actualizar Proveedor';
  subheading = 'Modificar campos para actualizar el proveedor.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';

  constructor() { }

  ngOnInit() {
  }

}
