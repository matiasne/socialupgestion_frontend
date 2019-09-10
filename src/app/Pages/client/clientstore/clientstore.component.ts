import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clientstore',
  templateUrl: './clientstore.component.html',
  styleUrls: ['./clientstore.component.sass']
})
export class ClientstoreComponent implements OnInit {

  heading = 'Nuevo Cliente';
  subheading = 'Rellenar todos los campos del formulario del nuevo cliente.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
  
  constructor() { }

  ngOnInit() {
  }

}
