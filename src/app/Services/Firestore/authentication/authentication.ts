import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { Subject } from 'rxjs';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommercesService } from '../commerces.service';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthenticationProvider {

  private user: firebase.User;
  userData:any;
  private isLogued:boolean = false;
  public subsAuthAction = new Subject<any>();
  user$: Observable<any>;

  constructor(
    public firebaseAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private toastr: ToastrService,
    private ngZone:NgZone,
  ) {
    
    this.user$ = this.firebaseAuth.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {          
          return this.afs.doc(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );

    this.firebaseAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })

    firebaseAuth.authState.subscribe(user => {
			this.user = user;
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));   
    console.log(user); 
    return (user !== null) ? true : false;
  }

  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));    
    return (user.emailVerified !== false) ? true : false;
  }


  signup(email, password) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
       
        this.SendVerificationMail();
        this.updateUserData(result.user);
      }).catch((error) => {
       console.log(error.message);
        if(error.message ==  "Password should be at least 6 characters"){
          this.toastr.info('La contraseña debe contener al menos 6 caracteres','Contraseña no valida', {
            timeOut: 5000,
          });           
        }

        if(error.message ==  "The email address is badly formatted."){
          this.toastr.info('El Email ingresado no tiene un formato valido','Error al ingresar Email', {
            timeOut: 5000,
          }); 
        }
      })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.firebaseAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.toastr.info('Te hemos enviado un mail para que verifiques tu correo','Correo Enviado', {
        timeOut: 5000,
      });
      this.router.navigate(['/']);
    })
  }

  resetPassword(email: string) {
    var auth = this.firebaseAuth.auth;
    return auth.sendPasswordResetEmail(email)
      .then(() => {
        this.toastr.info('Te hemos enviado un mail para que puedas reiniciar tu password','Correo Enviado', {
          timeOut: 5000,
        }); 
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log(error.message);
        if(error.message ==  "The email address is badly formatted."){
          this.toastr.info('El Email ingresado no tiene un formato valido','Error al ingresar Email', {
            timeOut: 5000,
          }); 
        }

        if(error.message == "There is no user record corresponding to this identifier. The user may have been deleted."){
          this.toastr.info('El Email ingresado no se encuentra registrado','Email incorrecto', {
            timeOut: 5000,
          }); 
        }

      })
  }


  login(email: string, password: string) {
   
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        
        this.ngZone.run(() => {
          this.router.navigate(['/home']);
        });

        return true;   

        
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);

        if(err.message ==  "The email address is badly formatted."){
          this.toastr.info('El Email ingresado no tiene un formato valido','Error al ingresar Email', {
            timeOut: 5000,
          }); 
          return false;
        }

        if(err.message ==  "The password is invalid or the user does not have a password."){
          this.toastr.info('El password ingresado no es correcto','Password Incorrecto', {
            timeOut: 5000,
          });
          return false
        }

        if(err.message == "There is no user record corresponding to this identifier. The user may have been deleted."){
          this.toastr.info('El usuario ingresado no existe','Usuario no encontrado', {
            timeOut: 5000,
          });
          return false
        }
       
    });
  }


 
  /*signInWithGoogle() {
		console.log('Sign in with google');
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
  }
*/
async googleSignin() {
  const provider = new auth.GoogleAuthProvider();
  const credential = await this.firebaseAuth.auth.signInWithPopup(provider).then(result => {
   
    this.updateUserData(result.user);   

    this.ngZone.run(() => {
      this.router.navigate(['/home']);
    });

  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  
}

private updateUserData(user) {
  // Sets user data to firestore on login
  const userRef: AngularFirestoreDocument = this.afs.doc(`users/${user.uid}`);

  const data = { 
    uid: user.uid, 
    email: user.email, 
    displayName: user.displayName, 
    photoURL: user.photoURL
  }  
  
  return userRef.set(data, { merge: true })

}

async signOut() {
  localStorage.setItem('user',null);
  await this.firebaseAuth.auth.signOut();
  
}

  get authenticated(): boolean {
    return this.userData !== null;
  }

  getEmail() {
    return this.userData && this.userData.email;
  }

  getUID(){
    
    let user =  JSON.parse(localStorage.getItem('user'));
    return user.uid;
  }

}