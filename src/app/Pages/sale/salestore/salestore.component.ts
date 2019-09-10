import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-salestore',
  templateUrl: './salestore.component.html',
  styleUrls: ['./salestore.component.sass']
})
export class SalestoreComponent implements OnInit {

  heading = 'Nueva Venta';
  subheading = 'Rellenar todos los campos del formulario de la nueva venta.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';

  constructor() { }

  ngOnInit() {
  }

}
