import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'src/app/interfaces/user';

@Injectable({
    providedIn: 'root'
})
​export class AuthenticationService {

  userData: any;
  authenticationState = new BehaviorSubject(false);

    actionCodeSettings = {
        url: 'http://localhost:4200/',
        handleCodeInApp: true,
        iOS: {
        bundleId: 'com.example.ios'
        },
        android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
        },
        dynamicLinkDomain: 'example.page.link'
    };

    constructor(
        public angularFirestore: AngularFirestore,
        public angularFireAuth: AngularFireAuth,
        public router: Router,
        public ngZone: NgZone
      ) {    
        this.angularFireAuth.authState.subscribe(user => {
          if (user) {
            this.userData = user;
            localStorage.setItem('user', JSON.stringify(this.userData));
            JSON.parse(localStorage.getItem('user')!);
          } else {
            const userData: User = {
                uid: '',
                email: '',
                displayName: '',
                photoURL: '',
                emailVerified: false,
            }
            localStorage.setItem('user', JSON.stringify(userData));
            JSON.parse(localStorage.getItem('user')!);
          }
      })
    }

    signUp(email: string, password: string): Promise<boolean> {
        return this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(res => {
            console.log('You have successfully signed up', res);
            this.sendVerificationMail();
            console.log('Welcome', res);
            this.setUserData(res.user);
            return true;
        }).catch(error => {
            console.log('Something went wrong:', error.message);
            return false;
        });
    }

    signIn(email: string, password: string): Promise<boolean> {
        return this.angularFireAuth.signInWithEmailAndPassword(email, password).then(res => {
            console.log('Welcome', res);
            this.setUserData(res.user);
            this.authenticationState.next(true);
            return true;
        }).catch(error => {
            console.log('Something went wrong:', error.message);
            return false;
        });
    }

    sendVerificationMail() {
        return firebase.auth().currentUser!.sendEmailVerification().then(() => {
            this.router.navigate(['/authorize/sign-up/verify']);
        })
    }

    forgotPassword(passwordResetEmail : string) {
        return firebase.auth().sendPasswordResetEmail(passwordResetEmail).then(() => {
            window.alert('Password reset email sent, check your inbox.');
        }).catch((error) => {
            console.log('Something went wrong:', error.message);
        })
    }

    isAuthenticated() : boolean{
        return this.authenticationState.value;
    }

    googleAuth() {
        return this.authLogin(new firebase.auth.GoogleAuthProvider());
    }

    authLogin(provider : any) {
        return firebase.auth().signInWithPopup(provider).then(res => {
            this.ngZone.run(() => {
                this.router.navigate(['']);
            })
          this.setUserData(res.user);
        }).catch((error) => {
            window.alert(error)
        })
      }

    setUserData(user : any) {
        const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(`users/${user.uid}`);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
        }
        return userRef.set(userData, {
            merge: true
        })
    }

    signOut() : Promise<void> {
        this.authenticationState.next(false);
        return this.angularFireAuth.signOut().then(() => {
            localStorage.removeItem('user');
        });
    }

}
