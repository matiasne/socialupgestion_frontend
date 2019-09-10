import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.sass']
})
export class EmployeComponent implements OnInit {
  
  heading = 'Empleados';
  subheading = 'Listado de todos los empleados del comercio.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
  buttons = [{
    href:"/empleado/guardar",
    icon:"plus",
    title:"Agregar Empleado"
  }]

  constructor() { }

  ngOnInit() {
  }

}
