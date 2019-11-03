import { Plan } from './Plan';

export class Service{

    public id:string;
    public name:string;
    public description:string;
    public category_id:number;    
    public code:string;
    public provider_id:number;
    public icon:string;
    public portada:string;
    public plans:Plan[]=[];

	constructor(
		
		){
  }
  
  addPlan(plan){
    var p  = new Plan();
    p.id = Math.floor(Math.random() * 2000) + 1;
    p.name = plan.name;
    p.period = plan.period;
    p.price = plan.price;
    this.plans.push(plan);
  }
}