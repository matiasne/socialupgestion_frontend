import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private collection:string;

  constructor(private firestore: AngularFirestore) {
    this.collection = 'orders';
  }

  public create(data:any) {
    const param = JSON.parse(JSON.stringify(data));
    return this.firestore.collection(this.collection).add(param);
  }
  public getOrder(documentId: string) {
      return this.firestore.collection(this.collection).doc(documentId).snapshotChanges();
  }

  public getAllOrders() {
    return this.firestore.collection(this.collection).snapshotChanges();
  }
}
