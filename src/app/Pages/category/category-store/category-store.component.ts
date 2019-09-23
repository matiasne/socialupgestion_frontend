import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-store',
  templateUrl: './category-store.component.html',
  styleUrls: ['./category-store.component.sass']
})
export class CategoryStoreComponent implements OnInit {

  heading = 'Nueva Categoria';
  subheading = 'Rellenar todos los campos del formulario de la nueva categoria.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
  
  constructor() { }

  ngOnInit() {
  }

}
