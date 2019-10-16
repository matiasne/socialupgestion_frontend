import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private collection:string;
  
  constructor(
    private firestore: AngularFirestore
  ) {
    let commerce_id = localStorage.getItem('commerce_id'); 
    this.collection = 'commerces/'+commerce_id+'/categories';
  }
  
  public create(data:any) {
   
    const param = JSON.parse(JSON.stringify(data));
    return this.firestore.collection(this.collection).add(param);
  }

  public get(documentId: string) {
    return this.firestore.collection(this.collection).doc(documentId).snapshotChanges();
  }

  public getAll() {   
    return this.firestore.collection(this.collection).snapshotChanges();
  }

  public update(documentId: string, data: any) {
    const param = JSON.parse(JSON.stringify(data));
    return this.firestore.collection(this.collection).doc(documentId).set(param);
  }

  public delete(documentId: string) {
    return this.firestore.collection(this.collection).doc(documentId).delete();
  }
}
