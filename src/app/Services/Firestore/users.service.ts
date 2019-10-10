import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private collection:string;

  constructor(
    private firestore: AngularFirestore
  ) {
    this.collection = 'users';
  }

  public getAllbyEMail(email) {  
    return this.firestore.collection(this.collection, ref => ref.where('email', '==', email)).snapshotChanges();
  }

  public asignEmployee(user){

    let commerce_id = localStorage.getItem('commerce_id');
    
    var collection = 'commerces/'+commerce_id+'/employees';
    this.firestore.collection(collection).add(user.id);

    var collection = 'users/'+user.id+'/commercesAsEmployee';
    this.firestore.collection(collection).add(commerce_id);
  }

  public asignAdmin(user){

    let commerce_id = localStorage.getItem('commerce_id');
    
    var collection = 'commerces/'+commerce_id+'/admins';
    this.firestore.collection(collection).add(user.id);

    var collection = 'users/'+user.id+'/commercesAsAdmin';
    this.firestore.collection(collection).add(commerce_id);
  }

  

}
