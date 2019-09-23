import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { CommercesService } from './commerces.service';

import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url:string;
  public httpHeaders:HttpHeaders;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.url = GLOBAL.url;
  }

  public login(_email:string,_password:string,_recordar:boolean){


    let body = {
      email:_email,
      password:_password
    }	      

		return this.httpClient.post(this.url+'auth/login', body) .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }	

  public validate(){

    this.httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    let options = {
      headers: this.httpHeaders
    };

    return this.httpClient.get(this.url+'auth/user', options) .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  public logout(){
    localStorage.setItem('commerce','0');
    localStorage.setItem('token','0');
  }

  public search(data){

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

    return this.httpClient.post(this.url+'users/search', body, options).pipe(
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
