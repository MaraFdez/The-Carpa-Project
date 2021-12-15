import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage : boolean = true;
  
  constructor(
    private authenticationService : AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  signUp() {
    this.authenticationService.signUp(this.email, this.password);
    this.email = '';
    this.password = '';
  }

}
