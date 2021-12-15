import { IUserData } from 'src/app/interfaces/user-data';
import { UserService } from './../../services/user/user.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser! : IUserData;

  constructor(
    private authenticationService : AuthenticationService,
    private userService : UserService,
    private route: ActivatedRoute, 
    private router: Router
  ) { 
    console.log("Log in -> " + this.isUserLoggedIn());
  }

  ngOnInit(): void {
    this.authenticationService.restoreSession();
    this.userService.getCurrentUser();
    this.currentUser = JSON.parse(localStorage.getItem("userDetails")!);
  }

  isUserLoggedIn() : boolean {
    return this.authenticationService.isAuthenticated();
  }

  signOut() {
    this.authenticationService.signOut();
    this.isUserLoggedIn();
  }

  myAccountRouting() {
    if(this.currentUser.username === "" || this.currentUser.username === null) {
      this.router.navigate(['/myProfile/new-user/form']);
      window.scrollTo(0, 0);
    } else {
      this.router.navigate(['/myProfile/user/' + this.currentUser.username]);
      window.scrollTo(0, 0);
    }
  }

  uploadRouting() {
    if(this.currentUser.username === "" || this.currentUser.username === null) {
      this.router.navigate(['/myProfile/new-user/form']);
      window.scrollTo(0, 0);
    } else {
      this.router.navigate(['/upload']);
      window.scrollTo(0, 0);
    }
  }

  isHome() : boolean {
    if(/^\/$/.test(this.router.url)) {
      return true;
    } else {
      return false;
    }
  }

  isUpload() : boolean {
    if(/^\/upload$/.test(this.router.url)) {
      return true;
    } else {
      return false;
    }
  }

  isWarehouse() : boolean {
    if(/^\/warehouse$/.test(this.router.url)) {
      return true;
    } else {
      return false;
    }
  }

}

