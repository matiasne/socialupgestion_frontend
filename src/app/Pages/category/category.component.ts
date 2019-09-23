import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.sass']
})
export class CategoryComponent implements OnInit {

  heading = 'Categorias';
  subheading = 'Listado de todos las categorias del comercio.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
  buttons = [{
    href:"/categoria/guardar",
    icon:"plus",
    title:"Agregar Categoria"
  }]

  
  constructor() { }

  ngOnInit() {
  }

}
