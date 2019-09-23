import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[],colum:any): any {
    
  if(colum['clienteText']){
    let a = colum['clienteText'];
    return value.filter((item)=> item.cliente.toLowerCase().includes((a.toLowerCase())));
   }else if(colum['estadoText']){
    let b =colum['estadoText'];
    return value.filter((item)=> item.estado.toLowerCase().includes((b.toLowerCase())));
   }else{
     return value;
   }
  

  }

  
}
