import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscriptionstore',
  templateUrl: './subscriptionstore.component.html',
  styleUrls: ['./subscriptionstore.component.sass']
})
export class SubscriptionstoreComponent implements OnInit {

  heading = 'Nueva Subscripcion';
  subheading = 'Rellenar todos los campos del formulario de la nueva subscripcion.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';


  constructor() { }

  ngOnInit() {
  }

}
