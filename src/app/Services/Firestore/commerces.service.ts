import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthenticationProvider } from './authentication/authentication';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommercesService {

  private collection:string;
  public commerceSubject = new BehaviorSubject <any>("");
  
  constructor(
    private firestore: AngularFirestore,
    private auth:AuthenticationProvider
  ) {
    this.collection = 'commerces';
    this.setSelectedCommerce(localStorage.getItem('commerce_id'));
  }

  getSelectedCommerce(): Observable<any>{
    return this.commerceSubject.asObservable();
  }

  public create(data:any) {
    let user_id = this.auth.getUID();
    data.user_id = user_id;
    const param = JSON.parse(JSON.stringify(data));
    return this.firestore.collection(this.collection).add(param);
  }

  public get(documentId: string) {
    return this.firestore.collection(this.collection).doc(documentId).snapshotChanges();
  }

  public getAllbyUser() {  
    let user_id = this.auth.getUID(); 
    return this.firestore.collection(this.collection, ref => ref.where('user_id', '==', user_id)).snapshotChanges();
  }

  public update(documentId: string, data: any) {
    let user_id = this.auth.getUID();
    data.user_id = user_id;
    const param = JSON.parse(JSON.stringify(data));
    return this.firestore.collection(this.collection).doc(documentId).set(param);
  }

  public delete(documentId: string) {
    return this.firestore.collection(this.collection).doc(documentId).delete();
  }

  public setSelectedCommerce(commerce_id){
    this.get(commerce_id).subscribe(data =>{
      this.commerceSubject.next(data.payload.data());
    })
    localStorage.setItem('commerce_id',commerce_id);
  }

}