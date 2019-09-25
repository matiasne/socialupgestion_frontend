import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { CommercesService } from './commerces.service';

import { GLOBAL } from './global';
import { BaseCRUDService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private partialUrl:string;
  constructor(
    public http: BaseCRUDService,
    public _commerceService:CommercesService,
  ) { 
    this.partialUrl = '/employees';
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

  public asignarRolEmpleado(user){


    let options = {
      headers: this.http.httpHeaders
    };    

    var commerce = JSON.parse(localStorage.getItem('commerce'));
    this.http.url = GLOBAL.url+'commerces/'+commerce.id+this.partialUrl;

    return this.http.httpClient.post(this.http.url+'/'+user.id, "", options).pipe(      
      retry(1),
      catchError(this.http.handleError)
    );

  }

  public desasignarRolEmpleado(user){


    let options = {
      headers: this.http.httpHeaders
    };    

 
    var commerce = JSON.parse(localStorage.getItem('commerce'));
    this.http.url = GLOBAL.url+'commerces/'+commerce.id+this.partialUrl;

    return this.http.httpClient.delete(this.http.url+'/'+user.id, options).pipe(      
      retry(1),
      catchError(this.http.handleError)
    );

  }




}
