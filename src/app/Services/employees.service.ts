import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { CommercesService } from './commerces.service';

import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  public url:string;
  public httpHeaders:HttpHeaders;
  private commerceSubscription: Subscription;
  public commerce:any;

  constructor(
    private httpClient: HttpClient,
    public _commerceService:CommercesService,
  ) {
    this.url = GLOBAL.url;

    this.commerceSubscription =  this._commerceService.getSelectedCommerce().subscribe(data=>{
      this.commerce = data;      
    });

  }

  get(){
    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    let options = {
      headers: this.httpHeaders
    };  

    return this.httpClient.get(this.url+'commerces/'+this.commerce.id+'/employees',options).pipe(      
      retry(1),
      catchError(this.handleError)
    );
  }

  public asignarRolEmpleado(user){

    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    let options = {
      headers: this.httpHeaders
    };    


    return this.httpClient.post(this.url+'commerces/'+this.commerce.id+'/employees/'+user.id, "", options).pipe(      
      retry(1),
      catchError(this.handleError)
    );

  }

  public desasignarRolEmpleado(user){

    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    let options = {
      headers: this.httpHeaders
    };    

 

    return this.httpClient.delete(this.url+'commerces/'+this.commerce.id+'/employees/'+user.id, options).pipe(      
      retry(1),
      catchError(this.handleError)
    );

  }



  
  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    //window.alert(errorMessage);
    return throwError(error.status);
 }


}
