import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employeupdate',
  templateUrl: './employeupdate.component.html',
  styleUrls: ['./employeupdate.component.sass']
})
export class EmployeupdateComponent implements OnInit {
  heading = 'Actualizar Empleado';
  subheading = 'Modificar campos para actualizar el empleado.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';

  constructor() { }

  ngOnInit() {
  }

}
