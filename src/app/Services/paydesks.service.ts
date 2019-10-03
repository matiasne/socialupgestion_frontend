import { Injectable } from '@angular/core';
import {Subscription } from 'rxjs';
import { GLOBAL } from './global';
import { CommercesService } from './commerces.service';
import { BaseCRUDService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class PaydesksService {

  private partialUrl:string;
  constructor(
    public http: BaseCRUDService,
    public _commerceService:CommercesService,
  ) { 
    this.partialUrl = '/paydesks';
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
}
