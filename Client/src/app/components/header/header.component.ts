import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authenticationService : AuthenticationService,
    private route: ActivatedRoute, 
    private router: Router
  ) { 
    console.log("Log in -> " + this.isUserLoggedIn());
  }

  ngOnInit(): void {
  }

  isUserLoggedIn() : boolean {
    return this.authenticationService.isAuthenticated();
  }

  signOut() {
    this.authenticationService.signOut();
    this.isUserLoggedIn();
    window.location.reload();
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

