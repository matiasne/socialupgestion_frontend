import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.sass']
})
export class StoreComponent implements OnInit {

  heading = 'Nuevo Producto';
  subheading = 'Rellenar todos los campos del formulario del nuevo producto.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
 
  constructor() { }

  ngOnInit() {
  }

}
