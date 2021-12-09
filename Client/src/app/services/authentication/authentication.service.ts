import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app';

@Injectable({
    providedIn: 'root'
})
​export class AuthenticationService {

  userData: Observable<firebase.User | null>;
  authenticationState = new BehaviorSubject(false);

  constructor(private angularFireAuth : AngularFireAuth) {
    this.userData = angularFireAuth.authState;
  }

  signUp(email: string, password: string): Promise<boolean> {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(res => {
      console.log('You have successfully signed up', res);
      return true;
    }).catch(error => {
      console.log('Something went wrong:', error.message);
      return false;
    });
  }

  signIn(email: string, password: string): Promise<boolean> {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password).then(res => {
      console.log('Welcome', res);
      return true;
    }).catch(error => {
      console.log('Something went wrong:', error.message);
      return false;
    });
  }

  signOut(): void {
    this.angularFireAuth.signOut();
  }

  isAuthenticated(){
    return this.authenticationState.value;
  }

}
