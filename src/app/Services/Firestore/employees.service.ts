import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthenticationProvider } from './authentication/authentication';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private collection:string;
  
  
  constructor(
    private firestore: AngularFirestore
  ) {
    let commerce_id = localStorage.getItem('commerce_id');
    this.collection = 'commerces/'+commerce_id+'/employees';
  }


  public create(data:any) {
    const param = JSON.parse(JSON.stringify(data));
    return this.firestore.collection(this.collection).add(param);
  }

  public get(documentId: string) {
    return this.firestore.collection(this.collection).doc(documentId).snapshotChanges();
  }

  public getAll() {   
    let commerce_id = localStorage.getItem('commerce_id');
    return this.firestore.collection('roles', ref => ref.where('commerce_id', '==', commerce_id).where('rol','==','employee')).snapshotChanges();
  }

  public update(documentId: string, data: any) {
    const param = JSON.parse(JSON.stringify(data));
    return this.firestore.collection(this.collection).doc(documentId).set(param);
  }

  public delete(employee_id) {
    
    let commerce_id = localStorage.getItem('commerce_id');    
    this.firestore.collection('roles', ref => ref.where('user_id', '==', employee_id).where('rol','==','employee')).snapshotChanges().subscribe(
      snapshot =>{
        snapshot.forEach((snap: any) => {
          console.log(snap.payload.doc.id)
          this.firestore.collection('roles').doc(snap.payload.doc.id).delete();
        });
      }
    );
  }

}