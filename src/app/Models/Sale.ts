import { Product } from './Product';
import { Service } from './Service';
import { Paydesk } from './Paydesk';

class SaleProduct{

    public id:string = "";
    public name:string = "";
    public count:number = 0;
    public price:number = 0;    

    constructor(
		
		){
    }
    
}

class SaleService{

    public id:string = "";
    public name:string = "";
    public count:number = 0;
    public price:number = 0;
    public periodDays:number = 0; 

    constructor(
		
		){
    }
    
}

class SalePayments{

    public date:Date = new Date();
    public method:string = "";
    public amount:number = 0;  

    constructor(
		
		){
    }
    
}

export class Sale{

      
    public clientId:string = "";
    public status:string = "";
    public paydeskId:string = "";
    public total_amount:number = 0;
    public total_products:number = 0;
    public description:string = "";


    public products:SaleProduct[] = [];
    public services:SaleService[] = [];
    public payments:SalePayments[] = [];


	constructor(
		
		){
    }
    
    public addClient(client){
        this.clientId = client.id;
    }
  
    public setStatus(status){
        this.status = status;
    }

    public setPaydesk(paydesk:Paydesk){
        this.paydeskId = paydesk.id;
    }

 

    public addDescription(description){
        this.description = description;
    }   

    public addProduct(product:Product,cantidad){
        this.total_products += cantidad;
        this.total_amount += cantidad * product.price;
        var p:SaleProduct = new SaleProduct();
        p.count = cantidad;
        p.id = product.id;
        p.name = product.name;
        p.price = product.price;
        this.products.push(p);
    }
  
    public addService(service:Service,periodDays,price){
        var s:SaleService = new SaleService();
        s.id = service.id;
        s.name = service.name;
        s.periodDays = periodDays;
        s.price = price;
        this.services.push(s);
    }
  
    public addPayment(amount,method){
        var pay:SalePayments = new SalePayments();
        pay.amount = amount;
        pay.method = method;
        this.payments.push(pay);
    }
}