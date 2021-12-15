import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'src/app/interfaces/user';

@Injectable({
    providedIn: 'root'
})
​export class AuthenticationService {

    userData: any;
    currentUserData! : User;
    authenticationState = new BehaviorSubject(false);
    nullData: User = {
        uid: '',
        email: '',
        displayName: '',
        emailVerified: false,
    }

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
              localStorage.setItem('user', JSON.stringify(this.nullData));
              JSON.parse(localStorage.getItem('user')!);
            }
        })
    }

    signUp(email: string, password: string) {
        return this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(res => {
            console.log('You have successfully signed up', res);
            this.sendVerificationMail();
        }).catch(error => {
            console.log('Something went wrong:', error.message);
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
            window.scrollTo(0, 0);
        })
    }

    forgotPassword(passwordResetEmail : string) {
        return firebase.auth().sendPasswordResetEmail(passwordResetEmail).then(() => {
            window.alert('Password reset email sent, check your inbox.');
        }).catch((error) => {
            console.log('Something went wrong:', error.message);
        })
    }

    restoreSession() {
        console.log(localStorage.getItem("user"));
        if (localStorage.getItem("user") != null && localStorage.getItem("user") != JSON.stringify(this.nullData)) {
            this.userData = JSON.parse(localStorage.getItem('user')!);
            // If email has not been verified you should not be able to enter the app
            if(this.userData.emailVerified === false) {
                localStorage.removeItem('user');
            } else {
                this.authenticationState.next(true);    
            }
        }
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
            emailVerified: user.emailVerified,
        }
        return userRef.set(userData, {
            merge: true
        })
    }

    signOut() : Promise<void> {
        return this.angularFireAuth.signOut().then(() => {
            this.authenticationState.next(false);
            localStorage.removeItem('user');
            localStorage.clear();
            window.location.reload();
        });
    }

}
