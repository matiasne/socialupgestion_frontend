import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class CommercesService {

  public url:string;
  public httpHeaders:HttpHeaders;

  
  public commerceSubject = new BehaviorSubject <any>("");
  constructor(
    private httpClient: HttpClient,
  ) { 
    this.url = GLOBAL.url;	

    if(localStorage.getItem('commerce')){
      var commerce = JSON.parse(localStorage.getItem('commerce'));
      this.commerceSubject.next(commerce);
    }    
  }

  getUserCommerces(){

    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    let options = {
      headers: this.httpHeaders
    };

    return this.httpClient.get(this.url+'commerces', options).pipe(
      map(response =>{

        return response;
      }),
      retry(1),
      catchError(this.handleError)
    );
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

    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    let options = {
      headers: this.httpHeaders
    };

    return this.httpClient.get(this.url+'commerces/'+id, options).pipe(      
      retry(1),
      catchError(this.handleError)
    );
  }


  addCommerce(data){

    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    let options = {
      headers: this.httpHeaders
    };

    let body = JSON.stringify(data);

    console.log(body);

    return this.httpClient.post(this.url+'commerces', body, options).pipe(
      map(response =>{
        return response;
      }),
      retry(1),
      catchError(this.handleError)
    );

  }

  updateCommerce(data){

    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    let options = {
      headers: this.httpHeaders
    };

    let body = JSON.stringify(data);

    console.log(body);

    return this.httpClient.patch(this.url+'commerces/'+data.id, body, options).pipe(
      map(response =>{
        return response;
      }),
      retry(1),
      catchError(this.handleError)
    );

  }

  deleteCommerce(data){

    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    let options = {
      headers: this.httpHeaders
    };
    
    return this.httpClient.delete(this.url+'commerces/'+data.id,  options).pipe(
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
