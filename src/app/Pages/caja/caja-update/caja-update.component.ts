import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-caja-update',
  templateUrl: './caja-update.component.html',
  styleUrls: ['./caja-update.component.sass']
})
export class CajaUpdateComponent implements OnInit {

  
  heading = 'Actualizar Caja';
  subheading = 'Modificar campos para actualizar la caja.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';

  constructor() { }

  ngOnInit() {
  }

}
