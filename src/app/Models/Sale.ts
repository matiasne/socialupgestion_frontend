import { Product } from './Product';
import { Service } from './Service';
import { Paydesk } from './Paydesk';
import { Plan } from './Plan';

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
    public plan:any;

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

    public on:boolean = false;
    public clientId:string = "";
    public clientName:string = "Seleccione un cliente";
    public status:string = "PAGADO";
    public paydesk:string = "";
    public total_amount:number = 0;
    public total_payment:number = 0;
    public total_products:number = 0;
    public description:string = "";

    public paymentMethods=[{
        name: "Efectivo"
    },{
        name: "Credito"
    },{
        name: "Debito"
    },{
        name: "Cuenta Corriente"
    },{
        name: "Descuentos"
    }];

    


    public products:SaleProduct[] = [];
    public services:SaleService[] = [];
    public payments:SalePayments[] = [];


	constructor(
		
		){
    }
    
    public addClient(client){
        this.clientId = client.id;
        this.clientName = client.name;
    }
  
    public setStatus(status){
        this.status = status;
    }

    public setPaydesk(paydesk){
        this.paydesk = paydesk;
        
    }

 

    public addDescription(description){
        this.description = description;
    }   

    public addProduct(product:Product,cantidad){
        this.total_products += cantidad;
        this.total_amount += cantidad * product.price;
        var p:SaleProduct = new SaleProduct();
        p.id = product.id;
        p.name = product.name;
        p.count = cantidad;
        p.price = product.price;
        this.products.push(p);
    }
  
    public addService(service:Service,plan:Plan){
        this.total_products += 1;
        this.total_amount += plan.price;
        console.log(plan);
        var s:SaleService = new SaleService();
        s.id = service.id;
        s.name = service.name;
        s.plan = plan;
        
        this.services.push(s);
    }
  
    public addPayment(amount,method){

        this.total_payment += amount;

        var pay:SalePayments = new SalePayments();
        pay.amount = amount;
        pay.method = method;
        this.payments.push(pay);
    }

    deleteProduct(index){
        this.products.splice(index,1);
    }

    deleteService(index){
        this.services.splice(index,1);
    }

    deleteMethod(index){
        this.payments.splice(index,1);
    }
}