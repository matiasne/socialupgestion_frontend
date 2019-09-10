import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientupdate',
  templateUrl: './clientupdate.component.html',
  styleUrls: ['./clientupdate.component.sass']
})
export class ClientupdateComponent implements OnInit {

  heading = 'Actualizar Cliente';
  subheading = 'Modificar campos para actualizar el cliente.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';

  constructor() { }

  ngOnInit() {
  }

}
