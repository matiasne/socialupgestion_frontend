import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthenticationProvider } from './authentication/authentication';
import { BehaviorSubject, Observable } from 'rxjs';
import { Commerce } from 'src/app/Models/Commerce';

@Injectable({
  providedIn: 'root'
})
export class CommercesService {

  private collection:string;
  private commerce:Commerce;
  public commerceSubject = new BehaviorSubject <any>("");
  
  constructor(
    private firestore: AngularFirestore,
    private auth:AuthenticationProvider
  ) {
    this.collection = 'commerces';
    this.commerce = new Commerce();
    this.setSelectedCommerce(localStorage.getItem('commerce_id'));
  }

  getSelectedCommerce(): Observable<any>{
    return this.commerceSubject.asObservable();
  }

  public create(data:any) {

    let user_id = this.auth.getUID();
    data.user_id = user_id;
    const param = JSON.parse(JSON.stringify(data));
    const commerce_id = this.firestore.createId();
    this.setUserAsAdmin(user_id,commerce_id);
    return this.firestore.doc(this.collection+'/'+commerce_id).set(param);
   
  }

  public get(documentId: string) {
    return this.firestore.collection(this.collection).doc(documentId).snapshotChanges();
  }

  private setUserAsAdmin(user_id,commerce_id){   
    var collection = 'roles';
    let params = {
      user_id : user_id,
      commerce_id : commerce_id,
      rol : "admin"
    }
    this.firestore.collection(collection).add(Object.assign({}, params));       
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
    
    if(commerce_id){
        this.get(commerce_id).subscribe(data =>{         
          var commerce:any = data.payload.data();

          
          this.commerce = commerce;
          this.commerce.id = commerce_id;
          this.commerceSubject.next(this.commerce);
        });
    }
    else{
      this.commerceSubject.next(undefined);    
    }

    localStorage.setItem('commerce_id',commerce_id);
  }

  

}