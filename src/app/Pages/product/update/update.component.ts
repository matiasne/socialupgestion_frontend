import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.sass']
})
export class UpdateComponent implements OnInit {

  heading = 'Actualizar Producto';
  subheading = 'Modificar campos para actualizar el producto.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';

  sub;
  name;
  commerce_id: any;
  provider_id: any;
  category_id: any;
  code: any;
  description: any;
  price: any;
  stock: any;

  constructor(private router: Router) {
  
    this.name = this.router.getCurrentNavigation().extras.state.name;
    this.commerce_id = this.router.getCurrentNavigation().extras.state.commerce_id;
    this.provider_id = this.router.getCurrentNavigation().extras.state.provider_id;
    this.category_id = this.router.getCurrentNavigation().extras.state.category_id;
    this.code = this.router.getCurrentNavigation().extras.state.code;
    this.description = this.router.getCurrentNavigation().extras.state.description;
    this.price = this.router.getCurrentNavigation().extras.state.price;
    this.stock = this.router.getCurrentNavigation().extras.state.stock;

  }
  ngOnInit() {
   
  }

  ngOnDestroy() {
  
    
  }

}
