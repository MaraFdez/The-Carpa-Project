import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private authenticationService : AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  forgotPassword(email : string) {
    this.authenticationService.forgotPassword(email);
  }

}
