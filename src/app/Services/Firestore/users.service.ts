import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthenticationProvider } from './authentication/authentication';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private collection:string;

  constructor(
    private firestore: AngularFirestore,
    
    private auth:AuthenticationProvider
  ) {
    this.collection = 'users';
  }

  public getAllbyEMail(email) {  
    return this.firestore.collection(this.collection, ref => ref.where('email', '==', email)).snapshotChanges();
  }

  public getCommerces(){
    let user_id = this.auth.getUID();
    return this.firestore.collection('roles', ref => ref.where('user_id', '==', user_id).where('rol','==','admin')).snapshotChanges();
  }


  public asignEmployee(user){

    let commerce_id = localStorage.getItem('commerce_id');   

    var collection = 'roles';
    let params = {
      user_id : user.id,
      commerce_id : commerce_id,
      rol : "employee"
    }
    this.firestore.collection(collection).add(Object.assign({}, params));


    
  }

  

  

}
