import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.sass']
})
export class CategoryUpdateComponent implements OnInit {

  heading = 'Actualizar Categoria';
  subheading = 'Modificar campos para actualizar la categoria.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
  
  constructor() { }

  ngOnInit() {
  }

}
