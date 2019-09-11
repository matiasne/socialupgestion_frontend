import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.sass']
})
export class SubscriptionComponent implements OnInit {

  heading = 'Subscripcion';
  subheading = 'Listado de todas las subscripciones del comercio.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';
  buttons = [{
    href:"/subscripcion/guardar",
    icon:"plus",
    title:"Nueva Subscripcion"
  }]

  constructor() { }

  ngOnInit() {
  }

}
