import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { GLOBAL } from './global';
import { CommercesService } from './commerces.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

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

  getProducts(){

    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    let options = {
      headers: this.httpHeaders
    };

    return this.httpClient.get(this.url+'commerces/'+this.commerce.id+'/products', options).pipe(
      map(response =>{
        return response;
      }),
      retry(1),
      catchError(this.handleError)
    );
  }

  addProduct(data){

    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    let options = {
      headers: this.httpHeaders
    };

    let body = data;

    return this.httpClient.post(this.url+'commerces/'+this.commerce.id+'/products', body, options).pipe(
      map(response =>{
        return response;
      }),
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
