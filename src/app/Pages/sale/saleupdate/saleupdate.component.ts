import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saleupdate',
  templateUrl: './saleupdate.component.html',
  styleUrls: ['./saleupdate.component.sass']
})
export class SaleupdateComponent implements OnInit {
  
  heading = 'Actualizar Venta';
  subheading = 'Modificar campos para actualizar la venta.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';

  constructor() { }

  ngOnInit() {
  }

}
