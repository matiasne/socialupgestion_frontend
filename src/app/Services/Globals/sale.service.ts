import { Injectable } from '@angular/core';
import { Sale } from 'src/app/Models/Sale';
import { Subject } from 'rxjs';
import { Paydesk } from 'src/app/Models/Paydesk';
import { Product } from 'src/app/Models/Product';
import { Service } from 'src/app/Models/Service';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private actualSale:Sale;
  public actualSaleSubject = new Subject<Sale>();

  constructor() { 
    this.actualSale = new Sale();
  }

  public getActualSaleSubs(){
    return this.actualSaleSubject.asObservable();
  }

  public addClient(client){
      this.actualSale.addClient(client);
      this.actualSaleSubject.next(this.actualSale);
  }

  setStatus(status){
    this.actualSale.setStatus(status);
    this.actualSaleSubject.next(this.actualSale);
  }

  setPaydesk(paydesk:Paydesk){
    this.actualSale.setPaydesk(paydesk);
    this.actualSaleSubject.next(this.actualSale);
  }

  addDescription(description){
    this.actualSale.addDescription(description);
    this.actualSaleSubject.next(this.actualSale);
  }   

  public addProduct(product:Product,cantidad){
    this.actualSale.addProduct(product,cantidad);
    this.actualSaleSubject.next(this.actualSale);
  }

  public addService(service:Service,periodDays,price){
    this.actualSale.addService(service,periodDays,price);
    this.actualSaleSubject.next(this.actualSale);
  }

  public addPayment(amount,method){
    this.actualSale.addPayment(amount,method);
    this.actualSaleSubject.next(this.actualSale);
  }

  save(){
    //Acá guarda en bd
  }


}
