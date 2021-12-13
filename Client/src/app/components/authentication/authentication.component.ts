import { Router } from '@angular/router';
import { Component, OnInit, Output } from '@angular/core';
import { AuthenticationService } from './../../services/authentication/authentication.service';
@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: boolean = true;

  constructor(
    private authenticationService : AuthenticationService,
    private router : Router
  ) { }

  ngOnInit(): void {}
  
  async signIn() {
    await this.authenticationService.signIn(this.email, this.password).then(output => {
        this.errorMessage = output
        if(this.errorMessage == true) {
            this.router.navigate(['']);
        }
    });
    this.email = '';
    this.password = '';
  }

  googleAuth() {
      this.authenticationService.googleAuth();
  }
  
}
