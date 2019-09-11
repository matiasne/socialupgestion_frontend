import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-provider-store',
  templateUrl: './provider-store.component.html',
  styleUrls: ['./provider-store.component.sass']
})
export class ProviderStoreComponent implements OnInit {

  heading = 'Nuevo Proveedor';
  subheading = 'Rellenar todos los campos del formulario del nuevo proveedor.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';

  constructor() { }

  ngOnInit() {
  }

}
