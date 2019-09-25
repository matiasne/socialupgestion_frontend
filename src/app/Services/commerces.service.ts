import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { GLOBAL } from './global';
import { BaseCRUDService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class CommercesService {

  public commerce:any;
  public commerceSubject = new BehaviorSubject <any>("");

  private partialUrl:string;
  constructor(
    public http: BaseCRUDService,
    public _commerceService:CommercesService,
  ) { 
    

    if(localStorage.getItem('commerce')){
      var commerce = JSON.parse(localStorage.getItem('commerce'));
      this.commerceSubject.next(commerce);
    }  

  } 

  get(){
    var commerce = JSON.parse(localStorage.getItem('commerce'));
    this.http.url = GLOBAL.url+'commerces/'+commerce.id+this.partialUrl;
    return this.http.get(); 
  }

  add(data){
    var commerce = JSON.parse(localStorage.getItem('commerce'));
    this.http.url = GLOBAL.url+'commerces/'+commerce.id+this.partialUrl;
    return this.http.add(data); 
  }

  update(data){
    var commerce = JSON.parse(localStorage.getItem('commerce'));
    this.http.url = GLOBAL.url+'commerces/'+commerce.id+this.partialUrl;
    return this.http.update(data); 
  }

  delete(data){
    var commerce = JSON.parse(localStorage.getItem('commerce'));
    this.http.url = GLOBAL.url+'commerces/'+commerce.id+this.partialUrl;
    return this.http.delete(data); 
  }

  
  getSelectedCommerce(): Observable<any>{
    return this.commerceSubject.asObservable();
  }

  setSelectedCommerce(commerce){
    
    this.getCommerceData(commerce.id).subscribe(
      (resp:any)=>{
        console.log(resp);
        localStorage.setItem('commerce',JSON.stringify(resp));
        this.commerceSubject.next(resp);
      }
    )   
  }

  getCommerceData(id){
    let options = {
      headers: this.http.httpHeaders
    };

    var commerce = JSON.parse(localStorage.getItem('commerce'));
    this.http.url = GLOBAL.url+'commerces/'+commerce.id+this.partialUrl;

    return this.http.httpClient.get(this.http.url+'/'+id, options).pipe(      
      retry(1),
      catchError(this.http.handleError)
    );
  }


}
