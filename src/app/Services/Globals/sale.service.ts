import { Injectable } from '@angular/core';
import { Sale } from 'src/app/Models/Sale';
import { Subject, BehaviorSubject } from 'rxjs';
import { Paydesk } from 'src/app/Models/Paydesk';
import { Product } from 'src/app/Models/Product';
import { Service } from 'src/app/Models/Service';
import { Plan } from 'src/app/Models/Plan';
import { SalesService } from '../Firestore/sales.service';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private actualSale:Sale = new Sale();
  public actualSaleSubject = new BehaviorSubject<Sale>(this.actualSale);

  constructor(
    private _salesService:SalesService
  ) { 
    this.actualSale = new Sale();
    this.actualSale.on = false;
  }

  public getActualSaleSubs(){
    return this.actualSaleSubject.asObservable();
  }

  public addClient(client){
      this.actualSale.addClient(client);
      this.actualSale.on = true;
      this.actualSaleSubject.next(this.actualSale);
      
  }

  setStatus(status){
    this.actualSale.setStatus(status);
    this.actualSale.on = true;
    this.actualSaleSubject.next(this.actualSale);
  }

  setPaydesk(paydesk){
    this.actualSale.setPaydesk(paydesk);
    this.actualSale.on = true;
    this.actualSaleSubject.next(this.actualSale);
  }

  addDescription(description){
    this.actualSale.addDescription(description);
    this.actualSale.on = true;
    this.actualSaleSubject.next(this.actualSale);
  }   

  public addProduct(product:Product,cantidad){
    this.actualSale.addProduct(product,cantidad);
    this.actualSale.on = true;
    this.actualSaleSubject.next(this.actualSale);
  }

  public addService(service:Service,plan:Plan){
    this.actualSale.addService(service,plan);
    this.actualSale.on = true;
    this.actualSaleSubject.next(this.actualSale);
  }

  public addPayment(amount,method){
    this.actualSale.addPayment(amount,method);
    this.actualSale.on = true;
    this.actualSaleSubject.next(this.actualSale);
  }

  save(){
    
    this._salesService.create(this.actualSale);
    this.actualSale = new Sale();
    
  }

  cancel(){
    this.actualSale = new Sale();
    this.actualSaleSubject.next(this.actualSale);
  }

  deleteProduct(index){
    this.actualSale.deleteProduct(index);
    this.actualSaleSubject.next(this.actualSale);
  }

  deleteService(index){
    this.actualSale.deleteService(index);
    this.actualSaleSubject.next(this.actualSale);
  }

  deleteMethod(index){
    this.actualSale.deleteMethod(index);
    this.actualSaleSubject.next(this.actualSale);
  }


}
