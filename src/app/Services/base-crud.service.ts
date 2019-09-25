import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class BaseCRUDService {

  public url:string;
  public httpHeaders:HttpHeaders;

  constructor(
    public httpClient: HttpClient,
  ) { 
    this.url = GLOBAL.url;   
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

    console.log(this.url);
    return this.httpClient.get(this.url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  add(data){

    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    
    let options = {
      headers: this.httpHeaders
    };

    let body = JSON.stringify(data);
    return this.httpClient.post(this.url, body, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  update(data){   

    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    
    let options = {
      headers: this.httpHeaders
    };

    let body = JSON.stringify(data);
    return this.httpClient.put(this.url+'/'+data.id, body, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  delete(data){   
    
    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    
    let options = {
      headers: this.httpHeaders
    };

    return this.httpClient.delete(this.url+'/'+data.id,  options).pipe(
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
