// import { Observable } from 'rxjs';
// import { AngularFireAuth } from "@angular/fire/auth";
// import firebase from 'firebase/app';

// ​
// export class AuthenticationService {

//   userData: Observable<firebase.User | null>;

//   constructor(private angularFireAuth : AngularFireAuth) {
//     this.userData = angularFireAuth.authState;
//   }

//   signUp(email: string, password: string): void {
//     this.angularFireAuth.createUserWithEmailAndPassword(email, password).then(res => {
//       console.log('You have successfully signed up', res);
//     }).catch(error => {
//       console.log('Something went wrong:', error.message);
//     });
//   }

//   signIn(email: string, password: string): void {
//     this.angularFireAuth.signInWithEmailAndPassword(email, password).then(res => {
//       console.log('Welcome');
//     }).catch(error => {
//       console.log('Something went wrong:', error.message);
//     });
//   }

//   signOut(): void {
//     this.angularFireAuth.signOut();
//   }

// }
