import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrdersService } from 'src/app/Services/Firestore/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.sass']
})
export class OrdersComponent implements OnInit {

  heading = 'Pedidos';
  subheading = 'Listado de todos los pedidos del comercio.';
  icon = 'pe-7s-phone icon-gradient bg-premium-dark';

  public orders:any;
  private orderSubscription: Subscription;

  constructor(
    public _ordersServices:OrdersService
  ) { 
    this.orders = [];
  }

  ngOnInit() {
    this.orderSubscription = this._ordersServices.getAllOrders().subscribe((snapshot) => {
      this.orders = [];
      snapshot.forEach((snap: any) => {
        this.orders.push(snap.payload.doc.data());
        this.orders[this.orders.length - 1].id = snap.payload.doc.id;
      });
      
    });
      
  }

  listo(order){
    order.enum_status = "confirmado";
  }

  confirmado(order){
    order.enum_status = "enviado";
  }

  guardar(){

    

    this.orders= [{
      'cliente' : 'Hugo',
      'telefono' : '3571320348',
      'direccion' : 'Artigas 80',
      'enviadopor' : 'Leandro',
      'timeprepared' : '1.5hr',
      'timesend' : '15min',
      'cadeteria_id' : '1',
      'total' : '350',
      'commerce_id' : '2',
      'enum_status' : 'pedido',
      'items' : JSON.parse('[{"producto": "lomito","count": "1", "price":"350"},{"producto": "Pizza","count": "2", "price":"700"}]'),
    },
    {
      'cliente' : 'Hugo Lopez',
      'telefono' : '3571320348',
      'direccion' : 'Artigas 80',
      'enviadopor' : 'Leandro',
      'timeprepared' : '1.5hr',
      'timesend' : '15min',
      'cadeteria_id' : '1',
      'total' : '350',
      'commerce_id' : '2',
      'enum_status' : 'confirmado',
      'items' : JSON.parse('[{"producto": "lomito","count": "1", "price":"350"},{"producto": "Pizza","count": "2", "price":"700"}]'),
    },
    {
      'cliente' : 'Pedro',
      'telefono' : '3571320348',
      'direccion' : 'Artigas 80',
      'enviadopor' : 'Leandro',
      'timeprepared' : '1.5hr',
      'timesend' : '15min',
      'cadeteria_id' : '1',
      'total' : '350',
      'commerce_id' : '2',
      'enum_status' : 'enviado',
      'items' : JSON.parse('[{"producto": "lomito","count": "1", "price":"350"},{"producto": "Pizza","count": "2", "price":"700"}]'),
    }];
    
    this._ordersServices.create(this.orders).then(() => {
      
    }, (error) => {
      console.error(error);        
    });  
  }

}
