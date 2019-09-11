import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employestore',
  templateUrl: './employestore.component.html',
  styleUrls: ['./employestore.component.sass']
})
export class EmployestoreComponent implements OnInit {

  heading = 'Nuevo Empleado';
  subheading = 'Rellenar todos los campos del formulario del nuevo empleado.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
  
  constructor() { }

  ngOnInit() {
  }

}
