import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[],name?:any,status?:any,payment?:any,
    startdateValue?:any,enddateValue?:any,period?:any,category_id?:any
    ): any {
    

    
  if(name){

    return value.filter((item)=> item.name.toLowerCase().includes((name.toLowerCase())));

  }else if(status){

    return value.filter((item)=> item.status.toLowerCase().includes((status.toLowerCase())));

  }else if(payment){

    return value.filter((item)=> item.pago.toLowerCase().includes((payment.toLowerCase())));

  }else if(startdateValue && enddateValue){

    return value.filter((item)=> ((item.fecha>=startdateValue)&&(item.fecha<=enddateValue)));

  }else if(period){
  
    return value.filter((item)=> item.period.toLowerCase().includes((period.toLowerCase())));

  }else if(category_id){
    return value.filter((item)=> item.category_id == category_id);
  }else{
    return value;
  }

  
  }
}
